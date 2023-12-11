import type { GetStaticProps } from 'next';
import React from 'react'
import Slug from '~/components/Slug/Slug';

type Slug = {
  title: string,
  desc: string,
  slug: string
}

export default function AnimePost(props:Slug){
  // const slug = useParams();
  return (
    <Slug slug={props.slug} />
  )
}


export const getStaticProps: GetStaticProps = (context) =>{
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
