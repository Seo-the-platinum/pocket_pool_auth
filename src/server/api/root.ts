import { postRouter } from "~/server/api/routers/post";
import { poolRouter } from "./routers/pool";
import { squareRouter } from "./routers/square";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  pool: poolRouter,
  post: postRouter,
  square: squareRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
