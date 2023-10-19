import React from 'react'
import { Card } from '~/components/Card/Card'
import { api } from '~/utils/api'

type Slug = {
  id:string,
  title: string,
  desc: string,
  cat: string
  catSlug: string,
  slug: string
}
export default function Hobbies(){
  const catPosts:any = api.posts.getCategoryPost.useQuery("hobbies")
  
  return (
    <div>
      <h1 className='text-white'>Hobbies Category</h1>
      {catPosts.data?.map((post:Slug) =>(
        <Card item={post} key={post.id}/>
      ))}
    </div>
  )
}