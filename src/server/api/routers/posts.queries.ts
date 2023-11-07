import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

let lastApiCallTime: number | null = null;
const postsQueriesRouters = createTRPCRouter({
    get: publicProcedure.query(async ({ctx}) =>{
        const posts = await ctx.db.post.findMany({
            orderBy:{
                createdAt: 'desc',
            },
            take: 4,
        })

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
                message: "post was not found.",
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
    getRandomPost: publicProcedure.query(async ({ctx}) =>{
        const currentTime = Date.now();
        const count = await ctx.db.post.count();
        const random = Math.floor(Math.random() * count);
        if(lastApiCallTime === null || currentTime - lastApiCallTime >= 4 * 60 * 60 * 1000){
            //make database query only if its the first call or 4 hours have passed
            const randomPost = await ctx.db.post.findMany({
                take: 1,
                skip: random,
            })
            lastApiCallTime = currentTime;

            if (!randomPost) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "post was not found.",
                });
            }
    
    
            return randomPost;
        }
    })
})

export default postsQueriesRouters