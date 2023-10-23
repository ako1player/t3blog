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
  slug: string,
  img: string
}
export default function Anime(){
  const catPosts:any = api.posts.getCategoryPost.useQuery("anime")
  return (
    <div className='pt-1'>
      <div className='relative'>
        <Image
        loading='lazy'
        src={'https://img.freepik.com/free-vector/modern-megapolis-river-night_1441-2830.jpg?w=1060&t=st=1697934026~exp=1697934626~hmac=5945ba29a36a4e831bbbe34aa47a46ec2b57511beef1d957e3a1fc86b42aa9bf'}
        width={500}
        height={500}
        alt='movie background'
        className='w-full h-52'
        />
        <h1 className='absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Anime</h1>
      </div>
      {catPosts.data?.map((post:Slug) =>(
        <Card item={post} key={post.id}/>
      ))}
    </div>
  )
}