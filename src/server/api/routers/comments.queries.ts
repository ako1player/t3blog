import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const commentsQueriesRouters = createTRPCRouter({
    get: protectedProcedure.input(z.string()).query(async ({ctx, input: postSlug}) =>{
        const comments = await ctx.db.comment.findMany({
            where:{
                postSlug
            },
            include:{
                user: true
            }
        })

        return comments;
    })
})

export default commentsQueriesRouters