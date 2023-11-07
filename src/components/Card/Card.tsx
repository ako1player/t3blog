import Link from 'next/link'
import React from 'react'

type Post = {
  title: string,
  desc: string,
  catSlug: string,
  slug: string
}

export const Card = ({item}:Post) => {
  return (
    <div className='px-2 py-2 max-w-xl text-center'>
         <div
        className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <h5
          className="mb-2 text-xl font-medium leading-tight ">
          {item.title}
        </h5>
        <p className="mb-4 text-base ">
          {item.desc}
        </p>
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
