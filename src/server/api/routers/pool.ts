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
    .input(
      z.object({
        size: sizeValidator,
        event: z.string(),
        league: z.string(),
        sport: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const pool = await ctx.db.pool.create({
        data: {
          size: input.size,
          event: input.event,
          league: input.league,
          sport: input.sport,
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
      await ctx.db.pool.update({
        where: {
          id: input.id,
        },
        data: {
          x: input.x,
          y: input.y,
        },
      });
    }),
  addTeams: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        top: z.string(),
        left: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.pool.update({
        where: {
          id: input.id,
        },
        data: {
          top: input.top,
          left: input.left,
        },
      });
    }),
});
