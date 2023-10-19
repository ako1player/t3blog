import { createTRPCRouter, publicProcedure } from "../trpc";

const categoriesQueriesRouters = createTRPCRouter({
    get: publicProcedure.query(async ({ctx }) =>{
        const categories = await ctx.db.category.findMany()

        return categories;
    })
})

export default categoriesQueriesRouters