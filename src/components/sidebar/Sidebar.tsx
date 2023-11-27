import Link from 'next/link'
import React from 'react'
import { api } from '~/utils/api'

export const Sidebar = () => {

  const posts = api.posts.get.useQuery()
  return (
    <div className='w-full text-center text-white border rounded sm:w-2/3 sm:h-32'>
        <h1>Recent Posts:</h1>
        <div className='flex flex-col'>
          {posts.data?.map((p, key) =>(
            <Link href={`/${p.catSlug}/${p.slug}`} className='hover:text-purple-400' key={key}>{p.title}</Link>
          ))}
        </div>
    </div>
  )
}
