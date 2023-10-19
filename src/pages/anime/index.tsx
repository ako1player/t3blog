import React from 'react'
import { Card } from '~/components/Card/Card'
import { api } from '~/utils/api'

type Slug = {
  id:string,
  title: string,
  desc: string,
  cat: string
  catSlug: string,
  slug: string,
  img: string
}
export default function Anime(){
  const catPosts:any = api.posts.getCategoryPost.useQuery("anime")
  
  return (
    <div>
      <h1 className='text-white'>Anime Category</h1>
      {catPosts.data?.map((post:Slug) =>(
        <Card item={post} key={post.id}/>
      ))}
    </div>
  )
}