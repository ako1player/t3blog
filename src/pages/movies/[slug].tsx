import type { GetStaticProps } from 'next';
import React from 'react'
import Slug from '~/components/Slug/Slug';

type Slug = {
  title: string,
  desc: string,
  slug: string
}
export default function MoviePost(props:Slug){
  //const singlePost = api.posts.getSinglePost.useQuery(props.slug);
  return (
  // <div>
  //     <h1 className='text-white text-6xl'>{singlePost.data?.title}</h1>
  //     <span className='text-white prose-h1:text-white prose prose-h2:text-white prose-h3:text-white' dangerouslySetInnerHTML={{__html: singlePost.data?.desc}}/>
  //     <Comments postSlug={props.slug} />
  //   </div>
  <Slug slug={props.slug} />
  )
}


// eslint-disable-next-line @typescript-eslint/require-await
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
