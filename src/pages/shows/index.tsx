import React from 'react'
import { Card } from '~/components/Card/Card'
import { api } from '~/utils/api'
import Image from 'next/image'

type Slug = {
  id:string,
  title: string,
  desc: string,
  cat: string
  catSlug: string,
  slug: string
}
export default function Shows(){
  const catPosts:string = api.posts.getCategoryPost.useQuery("shows")
  
  return (
    <div className='pt-1'>
      <div className='relative'>
        <div
        className='w-full bg-black h-52'
        />
        <h1 className='absolute text-5xl text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>Shows</h1>
      </div>
      <div className="grid sm:grid-cols-4 grid-cols-2">
        {catPosts.data?.map((post:Slug) =>(
            <Card item={post} key={post.id}/>
        ))}
      </div>
    </div>
  )
}
