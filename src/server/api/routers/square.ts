import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const squareRouter = createTRPCRouter({
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
          name: z.string(),
          userId: z.optional(z.string()),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const squares = await Promise.all(
        input.map((square) => {
          return ctx.db.square.update({
            where: { id: square.id },
            data: {
              status: square.status,
              name: square.name,
              user: square.userId
                ? { connect: { id: square.userId } }
                : undefined,
            },
          });
        }),
      );
      return squares;
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
