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
export default function Shows(){
  const catPosts:any = api.posts.getCategoryPost.useQuery("shows")
  
  return (
    <div>
      <h1 className='text-white'>Shows Category</h1>
      {catPosts.data?.map((post:Slug) =>(
        <Card item={post} key={post.id}/>
      ))}
    </div>
  )
}
