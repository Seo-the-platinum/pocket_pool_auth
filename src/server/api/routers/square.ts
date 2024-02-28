import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const squareRouter = createTRPCRouter({
  updateSquare: publicProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const square = await ctx.db.square.update({
        where: { id: input.id },
        data: { status: input.status },
      });
      return square;
    }),
});
