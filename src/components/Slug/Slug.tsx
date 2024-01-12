import { api } from "~/utils/api";
import { Sidebar } from "../sidebar/Sidebar";
import { Comments } from "../comments/Comments";
import Image from "next/image";
import type { SlugType } from "../../Constants/Types";
import { Eye } from "styled-icons/bootstrap";

export default function Slug(slug:SlugType){
    const singlePost = api.posts.getSinglePost.useQuery(slug.slug);
    if(singlePost.data === undefined){
      return(
        <div>Page Not Found</div>
      )
    }
    return (
      <div className='pt-10 mx-2'>
        <span className="text-sm text-white"><Eye size={15}/> {singlePost.data?.views}</span>
        <div className='sm:flex flex-row justify-between'>
          <div className='sm:grid md:grid-flow-col'>
            {singlePost.data?.img.length === 0 ? " " : <Image src={singlePost.data?.img} alt={singlePost.data?.title} width={200} height={200} priority />}
            <div className='flex flex-col pl-1'>
              <p className='text-white text-5xl'>{singlePost.data?.title}</p>
              <span className='text-white prose-h1:text-white prose prose-h2:text-white prose-h3:text-white' dangerouslySetInnerHTML={{__html: singlePost.data?.desc}}/>
            </div>
          </div>
          <div className='mr-10'>
            <Sidebar />
          </div>
        </div>
        <Comments postSlug={slug.slug} />
      </div>
    )
}
