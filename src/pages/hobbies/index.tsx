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
  const catPosts:string = api.posts.getCategoryPost.useQuery("hobbies")
  
  return (
    <div className='pt-1'>
      <div className='relative'>
        <div
        className='w-full h-52 bg-black'
        />
        <h1 className='absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Hobbies</h1>
      </div>
      {catPosts.data?.map((post:Slug) =>(
        <Card item={post} key={post.id}/>
      ))}
    </div>
  )
}