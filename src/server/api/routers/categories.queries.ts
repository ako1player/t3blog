import { createTRPCRouter, protectedProcedure } from "../trpc";

const categoriesQueriesRouters = createTRPCRouter({
    get: protectedProcedure.query(async ({ctx, input }) =>{
        const categories = await ctx.db.category.findMany()

        return categories;
    })
})

export default categoriesQueriesRouters