import { GetStaticProps } from 'next'
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
  const catPosts:any = api.posts.getCategoryPost.useQuery("movies")
  console.log( "MOVIES", catPosts)
  return (
    <div>
      <h1 className='text-white'>Movie Category</h1>
      {catPosts.data?.map((post:Slug) =>(
        <Card item={post} key={post.id}/>
      ))}
    </div>
  )
}

