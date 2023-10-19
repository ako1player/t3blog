import { GetStaticProps } from 'next';
import React from 'react'
import { api } from '~/utils/api'

type Slug = {
  title: string,
  desc: string,
  slug: string,
}

export default function HobbyPost(props:Slug){
  // const slug = useParams();
  const singlePost = api.posts.getSinglePost.useQuery(props.slug);

  return (
    <div>
      <h1 className='text-white'>{singlePost.data?.title}</h1>
      <p className='text-white'>{singlePost.data?.desc}</p>
    </div>
  )
}


export const getStaticProps: GetStaticProps =async (context) => {
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
