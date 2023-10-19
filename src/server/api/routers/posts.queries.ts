import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const postsQueriesRouters = createTRPCRouter({
    get: publicProcedure.query(async ({ctx}) =>{
        const posts = await ctx.db.post.findMany()

        return posts;
    }),

    getSinglePost: publicProcedure.input(z.string()).query(async ({ctx, input:slug}) =>{
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

    getCategoryPost: publicProcedure.input(z.string()).query(async ({ctx, input:cat}) =>{
        const catPost = await ctx.db.post.findMany({
            where:{
                catSlug: cat
            }
        })

        return catPost
    }),
})

export default postsQueriesRouters