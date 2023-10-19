import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const postsQueriesRouters = createTRPCRouter({
    get: protectedProcedure.query(async ({ctx, input }) =>{
        const posts = await ctx.db.post.findMany()

        return posts;
    }),

    getSinglePost: protectedProcedure.input(z.string()).query(async ({ctx, input:slug}) =>{
        const singlePost = await ctx.db.post.findUnique({
            where: {
                slug
            },
            include:{
                user: true,
            }
        })

        if (!singlePost) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Kudos was not found.",
            });
        }


        return singlePost;
    }),

    getCategoryPost: protectedProcedure.input(z.string()).query(async ({ctx, input:cat}) =>{
        const catPost = await ctx.db.post.findMany({
            where:{
                catSlug: cat
            }
        })

        return catPost
    }),
})

export default postsQueriesRouters