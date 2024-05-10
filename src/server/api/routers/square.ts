import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const squareRouter = createTRPCRouter({
  // TODO: LOOK INTO HOW WE CAN MAKE A CUSTOM SQL QUERY TO DECREASE ELAPSED TIME
  getSquare: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const square = await ctx.db.square.findUnique({
        where: { id: input.id },
      });
      return square;
    }),
  adminUpdateSquares: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          status: z.string(),
          name: z.string(),
          userId: z.optional(z.string()),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const queries = input.map((square) => {
        return ctx.db.square.update({
          where: { id: square.id },
          data: {
            status: square.status,
            name: square.name,
            userId: square?.userId ? square.userId : null,
          },
        });
      });

      return await ctx.db.$transaction(queries);
    }),
  updateSquare: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.string(),
        name: z.string(),
        userId: z.optional(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const square = await ctx.db.square.update({
        where: { id: input.id },
        data: { status: input.status },
      });
      return square;
    }),
  updateSquares: publicProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          status: z.string(),
          userId: z.optional(z.string()),
          name: z.string(),
          updatedAt: z.date(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      //USE ANY TO UPDATE MULTIPLE ROWS THAT MATCH IDS IN THE INPUT.IDS ARRAY
      try {
        // await ctx.db.$executeRaw`
        //   UPDATE "Square"
        //   SET "status" = ${input.status},
        //     "name" = ${input.name},
        //     "userId" = ${input.userId}
        //   WHERE "id" = any (${input.ids})
        // `;
        const updateSquares = await ctx.db.$transaction(async (tx) => {
          const results = await Promise.all(
            input.map(async (update) => {
              const { id, updatedAt, ...updateData } = update;
              const updateSquare = await tx.square.update({
                where: { id, updatedAt },
                data: updateData,
              });
              return updateSquare;
            }),
          );
          return results.filter((square) => square !== null);
        });
        if (updateSquares.length !== input.length) {
          throw new Error("Failed to update all squares");
        }
        return updateSquares;
      } catch (error) {
        throw new Error("Failed to update squares");
      }
    }),
  addSquareValues: protectedProcedure
    .input(
      z.object({
        poolId: z.string(),
        x: z.number().array(),
        y: z.number().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // This is a raw SQL query that updates the x and y values of the squares in the pool
      await ctx.db.$executeRaw`
        UPDATE "Square"
        SET x = (SELECT "x" FROM "Pool" WHERE "id" = ${input.poolId})[CEIL(CAST("number" AS decimal)/10)],
         y = (SELECT "y" FROM "Pool" WHERE "id" = ${input.poolId})[
          CASE
            WHEN MOD("number", 10) = 0 THEN 10
            ELSE MOD("number", 10)
          END
         ]
        WHERE "poolId" = ${input.poolId}
      `;
    }),
});
