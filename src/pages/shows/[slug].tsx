import { GetStaticProps } from 'next';
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
          <Image src={'https://assets.teenvogue.com/photos/615327f812eb503af0cde8b3/1:1/w_3132,h_3132,c_limit/SquidGame_Unit_104_1570.jpg'}
          alt='Squid Games Picture'
          width={400}
          height={400}
          />
          <p className='text-white'>The Squid Game is a South Korean television series that has gained immense popularity worldwide. The show revolves around a group of financially struggling individuals who participate in a deadly game to win a large sum of money. The series is a commentary on the harsh realities of life and the lengths people will go to for financial gain. The show's cinematography, acting, and storyline have been praised by critics and audiences alike. The Squid Game is a must-watch for those who enjoy thought-provoking and intense dramas. Its success has made it a cultural phenomenon and a testament to the power of storytelling.</p>
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
