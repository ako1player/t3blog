import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const userQueriesRouter = createTRPCRouter({
    getUser: protectedProcedure.query(async ({ctx: {db}}) =>{
        const user = await db.user.findMany({
            select: {
                id:true,
                role: true,
                name: true,
            }
        })
        return user;
    })
})

export default userQueriesRouter;