import { api } from "~/utils/api";
import { Sidebar } from "../sidebar/Sidebar";
import { Comments } from "../comments/Comments";

export default function Slug(slug){
    const singlePost = api.posts.getSinglePost.useQuery(slug.slug);

    return (
      <div className='pt-10'>
        <div className='sm:flex flex-row justify-between'>
          <div className='sm:grid md:grid-flow-col'>
            {/* Image */}
            <div className='flex flex-col'>
              <h1 className='text-white text-6xl'>{singlePost.data?.title}</h1>
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