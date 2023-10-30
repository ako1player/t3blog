import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const postsMutationRouters = createTRPCRouter({
    createPost: protectedProcedure.input(z.object({img: z.string(),title: z.string(),desc: z.string(), slug: z.string(), catSlug: z.string()})).mutation(async ({ctx: {session, db}, input}) =>{
        const {title, desc, slug, catSlug, img} = input;
        const post = await db.post.create({
            data:{
                title,
                img,
                desc,
                slug,
                catSlug,
                userEmail: session.user.email,
            }
        });

        if (!post) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create new post.",
            });
        }

        return post;
    })
})

export default postsMutationRouters