import { createTRPCRouter, mergeTRCPRouters } from "~/server/api/trpc";
import categoriesMutationRouters from "./routers/categories.mutation";
import categoriesQueriesRouters from "./routers/categories.queries";
import postsMutationRouters from "./routers/posts.mutation";
import postsQueriesRouters from "./routers/posts.queries";
import commentsQueriesRouters from "./routers/comments.queries";
import commentsMutationRouters from "./routers/comments.mutation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  categories: mergeTRCPRouters(categoriesMutationRouters, categoriesQueriesRouters),
  posts: mergeTRCPRouters(postsMutationRouters, postsQueriesRouters),
  comments: mergeTRCPRouters(commentsMutationRouters, commentsQueriesRouters)
});

// export type definition of API
export type AppRouter = typeof appRouter;
