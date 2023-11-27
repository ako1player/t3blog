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

  const {data, isLoading} = api.posts.getRandomPost.useQuery();
  const [featuredPost, setFeaturedPost] = useState<Post[]>(data)

  return (
    <div>
        <h1 className='text-3xl text-white'>Random Post:</h1>
        {isLoading && <span className='text-white'>...is loading</span>}
        {data === undefined ? 
          featuredPost?.map((f:string, idx:number) => <Card item={f} key={idx} />)
          :
          data?.map((f:string, idx:number) => <Card item={f} key={idx} />)
        }
    </div>
  )
}
