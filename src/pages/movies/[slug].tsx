import { GetStaticProps } from 'next';
import React from 'react'
import { api } from '~/utils/api'
import { Comments } from '~/components/comments/Comments';

type Slug = {
  title: string,
  desc: string,
  slug: string
}
export default function MoviePost(props:Slug){
  const singlePost = api.posts.getSinglePost.useQuery(props.slug);
  return (
  <div>
      <h1 className='text-white'>{singlePost.data?.title}</h1>
      <span className='text-white prose-h1:text-white prose' dangerouslySetInnerHTML={{__html: singlePost.data?.desc}}/>
      <Comments postSlug={props.slug} />
    </div>
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
