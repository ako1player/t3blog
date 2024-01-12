import React, {useState} from 'react'
import { api } from '~/utils/api'
import { Card } from '../Card/Card';

type Post = {
  title: string,
  desc: string,
  catSlug: string,
  slug: string
}

export const Featured = () => {
  const catArray = ["anime", "hobbies", "movies", "shows"]
  const {data, isLoading} = api.posts.getRandomPost.useQuery();
  const catPosts = api.posts.getCategoryPost.useQuery(catArray[(Math.floor(Math.random() * catArray.length))])

  console.log("-------", data)
  return (
    <div>
        <h1 className='text-3xl text-white'>Random Post:</h1>
        {isLoading && <span className='text-white'>...is loading</span>}
        {data === undefined ? 
          catPosts.data?.map((f:string, idx:number) => <Card item={f} key={idx} />)
          :
          data?.map((f:string, idx:number) => <Card item={f} key={idx} />)
        }
    </div>
  )
}
