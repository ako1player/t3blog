import { GetStaticProps } from 'next'
import Image from 'next/image'
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
export default function Movies(){
  const catPosts:string = api.posts.getCategoryPost.useQuery("movies")
  console.log( "MOVIES", catPosts)
  return (
    <div className='pt-1'>
      <div className='relative'>
        <Image
        loading='lazy'
        src={'https://img.freepik.com/premium-photo/clapperboard-movie-slate-black-face-mask-megaphone-yellow-background-yellow-black-color_335640-902.jpg?w=996'}
        width={500}
        height={500}
        alt='movie background'
        className='w-full h-52'
        />
        <h1 className='absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Movies</h1>
      </div>
      {/* // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      {catPosts.data?.map((post:Slug) =>(
        <Card item={post} key={post.id}/>
      ))}
    </div>
  )
}

