import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const sizeValidator = z.union([z.literal(25), z.literal(100)]);
//comeback and fix this
export const poolRouter = createTRPCRouter({
  getPools: publicProcedure.query(({ ctx }) => {
    return ctx.db.pool.findMany();
  }),
  getPoolById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.pool.findFirst({
        where: { id: input.id },
        include: { squares: true },
      });
    }),
  create: protectedProcedure
    .input(z.object({ size: sizeValidator }))
    .mutation(async ({ ctx, input }) => {
      const pool = await ctx.db.pool.create({
        data: {
          size: input.size,
          user: { connect: { id: ctx.session.user.id } },
          squares: {
            createMany: {
              data: Array.from({ length: input.size }).map((_, index) => ({
                status: "open",
                number: index + 1,
              })),
            },
          },
        },
      });
      return pool;
    }),
});
