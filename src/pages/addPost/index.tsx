import { useSession } from 'next-auth/react';
import React, {FormEvent, useState} from 'react'
import { api } from '~/utils/api'

export default function AddPost(){
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('movies')
    const categories = api.categories.get.useQuery();
    const post = api.posts.createPost.useMutation();
    // const { data: sessionData, status } = useSession();
    // const user = api.users.getUser.useQuery();
    // const isAdmin = user.data?.filter((u) => {
    //     if(u.id === sessionData?.user.id && u.role ==='Admin'){
    //         return u;
    //     }
    // })
    const slugify = (str:string) =>{
       return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    const handleSubmit = async (e:FormEvent) =>{
        e.preventDefault();
        console.log(title, desc, category)
        await post.mutateAsync({
            title,
            desc,
            slug: slugify(title),
            catSlug: category,
            img: ''
        })
    }
    return (
        <div className='text-center'>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className="flex flex-col items-center justify-center text-white" onSubmit={handleSubmit}>
        <h1 className='text-2xl text-white'>Create a new post: </h1>
            <div className='mt-4'>
                <label>
                    Title:
                    <input
                        type="text"
                        className="text-white border-b outline-none bg-inherit sm:ml-1"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                </label>
                <label className='ml-2'>
                    Category:
                    <select className='text-white border-b outline-none bg-inherit sm:ml-1' required onChange={(e)=> setCategory(e.target.value)} value={category}>
                    {categories.data?.map((cat)=>(
                        <option key={cat.id} value={cat.title}>{cat.title}</option>
                    ))}
                    </select>
                </label>
            </div>
            <div className='sm:flex sm:flex-row sm:mt-4'>
            <label>
                Body:
            </label>
                <textarea
                    rows={5}
                    cols={50}
                    className="text-white border bg-inherit outline-none rounded-sm sm:ml-1"
                    required
                    onChange={(e)=> setDesc(e.target.value)}
                    value={desc}
                />
            </div>
            <button type='submit' className='w-10 mt-4 text-purple-800 bg-white rounded hover:text-white hover:bg-purple-800'>Post</button>
        </form>            
        </div>
    )
}
