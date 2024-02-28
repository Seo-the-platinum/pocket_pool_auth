import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
              userId: square.userId
                ? { connect: { id: square.userId } }
                : userId,
            },
          });
        }),
      );
      return squares;
    }),
});
