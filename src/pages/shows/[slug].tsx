import type { GetStaticProps } from 'next';
import React from 'react'
import Slug from '~/components/Slug/Slug';

type Slug = {
  slug: string
}

export default function ShowPost(props:Slug){
  // const slug = useParams();
  //const singlePost = api.posts.getSinglePost.useQuery(props.slug);

  return (
    // <div className='pt-10'>
    //   <div className='sm:flex flex-row justify-between'>
    //     <div className='sm:grid md:grid-flow-col'>
    //       {/* Image */}
    //       <div className='flex flex-col'>
    //         <h1 className='text-white text-6xl'>{singlePost.data?.title}</h1>
    //         <span className='text-white prose-h1:text-white prose prose-h2:text-white prose-h3:text-white' dangerouslySetInnerHTML={{__html: singlePost.data?.desc}}/>
    //       </div>
    //     </div>
    //     <div className='mr-10'>
    //       <Sidebar />
    //     </div>
    //   </div>
    //   <Comments postSlug={props.slug} />
    // </div>
    <Slug slug={props.slug} />
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
