import type { GetStaticProps } from 'next';
import React from 'react'
import { Comments } from '~/components/comments/Comments';
import { api } from '~/utils/api'
import Image from 'next/image'
import { Sidebar } from '~/components/sidebar/Sidebar';

type Slug = {
  slug: string
}

export default function ShowPost(props:Slug){
  // const slug = useParams();
  const singlePost = api.posts.getSinglePost.useQuery(props.slug);

  return (
    <div className='pt-10'>
      <div className='sm:flex flex-row'>
        <div className='sm:grid md:grid-flow-col'>
          {/* <Image src={}  
          alt=''
          width={400}
          height={400}
          className='rounded lg:pl-2 pl-7 text-center'
          /> */}
          <h1 className='text-white text-6xl'>{singlePost.data?.title}</h1>
          <span className='text-white prose-h1:text-white prose prose-h2:text-white prose-h3:text-white' dangerouslySetInnerHTML={{__html: singlePost.data?.desc}}/>
        </div>
        <Sidebar />
      </div>
      {/* <h1 className='text-white text-3xl'>{singlePost.data?.title}</h1>
      <Image src={singlePost.data?.img} alt={singlePost.data?.title} width={500} height={500} />
      <p className='text-white'>{singlePost.data?.desc}</p> */}
      <Comments postSlug={props.slug} />
    </div>
  )
}


export const getStaticProps: GetStaticProps = (context) => {
  const slug = context.params?.slug;

  return {
    props: {
      slug
    }
  }
}

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking"};
}
