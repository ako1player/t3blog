import Link from 'next/link'
import React from 'react'
import type { Post } from '~/Constants/Types'

export const Card = ({item}:Post) => {
  return (
    <div className='px-2 py-2 max-w-xl text-center text-white'>
      <div
        className="block rounded-lg bg-gradient-to-t from-sky-400 to-sky-200 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <h5
          className="mb-2 text-xl font-medium leading-tight ">
          {item.title}
        </h5>
        <div>
          <button
            type="button"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal underline hover:underline-offset-4">
              {/* /hobbies/ */}
            <Link href={`/${item.catSlug}/${item.slug}`}>Read More</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
