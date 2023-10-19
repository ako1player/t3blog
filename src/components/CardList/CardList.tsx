import React from 'react'
import { Card } from '../Card/Card'
import { api } from '~/utils/api'

  
export const CardList = () => {

    const posts:any = api.posts.get.useQuery()
    // const data = [{
    //     title: "Test",
    //     desc: "DEsc",
    //     catSlug: "hobbies",
    //     slug: "1"
    // },
    // {
    //     title: "Test",
    //     desc: "DEsc",
    //     catSlug: "hobbies",
    //     slug: "3"
    // },
    // {
    //     title: "Test",
    //     desc: "DEsc",
    //     catSlug: "hobbies",
    //     slug: "4"
    // },
    // {
    //     title: "Test",
    //     desc: "DEsc",
    //     catSlug: "hobbies",
    //     slug: "5"
    // },{
    //     title: "Test",
    //     desc: "DEsc",
    //     catSlug: "hobbies",
    //     slug: "2"
    // },{
    //     title: "Test",
    //     desc: "DEsc",
    //     catSlug: "hobbies",
    //     slug: "2"
    // },{
    //     title: "Test",
    //     desc: "DEsc",
    //     catSlug: "hobbies",
    //     slug: "2"
    // },{
    //     title: "Test",
    //     desc: "DEsc",
    //     catSlug: "hobbies",
    //     slug: "2"
    // },{
    //     title: "Test",
    //     desc: "DEsc",
    //     catSlug: "hobbies",
    //     slug: "2"
    // },{
    //     title: "Test",
    //     desc: "DEsc",
    //     catSlug: "hobbies",
    //     slug: "2"
    // },]
    return (
        <div>
            <h1 className='text-white text-2xl'>Recent Posts:</h1>
            <div className="grid sm:grid-cols-4 grid-cols-2">
                {posts.data?.map((p:any) =>(
                    <Card item={p} key={p.id}/>
                ))}
            </div>
        </div>
    )
}
