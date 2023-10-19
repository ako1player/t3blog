import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const commentsMutationRouters = createTRPCRouter({
    postComment: protectedProcedure.input(z.object({desc: z.string(), postSlug: z.string()})).mutation(async ({ctx: {session, db}, input}) =>{
        const {desc, postSlug} = input;
        const comment = await db.comment.create({
            data:{
                desc,
                postSlug,
                userEmail: session.user.email
            }
        });

        if (!comment) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create comment.",
            });
        }

        return comment;
    })
})

export default commentsMutationRouters;