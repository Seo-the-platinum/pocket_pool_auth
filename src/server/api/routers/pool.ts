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
        include: {
          squares: {
            orderBy: {
              number: "asc",
            },
          },
          user: true,
        },
      });
    }),
  getUsersPools: protectedProcedure.query(({ ctx }) => {
    return ctx.db.pool.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  create: protectedProcedure
    .input(z.object({ size: sizeValidator, event: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const pool = await ctx.db.pool.create({
        data: {
          size: input.size,
          event: input.event,
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
  addValues: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        x: z.number().array(),
        y: z.number().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const squares = await ctx.db.square.findMany({
        where: {
          poolId: input.id,
        },
      });

      const updateSquares = squares.map((square) => {
        return ctx.db.square.update({
          where: { id: square.id },
          data: {
            x: input.x[Math.min(Math.floor(square.number / 10), 9)],
            y: input.y[(square.number - 1) % 10],
          },
        });
      });

      await ctx.db.pool.update({
        where: {
          id: input.id,
        },
        data: {
          x: input.x,
          y: input.y,
        },
      });

      await ctx.db.$transaction(updateSquares);
    }),
});
