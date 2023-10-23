import React, {useState} from 'react'
import { api } from '~/utils/api'

export default function AddPost(){
    const categories = api.categories.get.useQuery();

    return (
        <div className='text-center'>
            <h1 className='text-2xl text-white'>Create a new post: </h1>
            <form className="flex flex-col items-center justify-center text-white">
                <div className='mt-4'>
                    <label>
                        Title:
                        <input
                            type="text"
                            className="text-white border-b outline-none bg-inherit"
                            />
                    </label>
                    <label className='ml-2'>
                        Category:
                        <select className='text-white border-b outline-none bg-inherit'>
                        {categories.data?.map((cat)=>(
                            <option value={cat.title} key={cat.id}>{cat.title}</option>
                        ))}
                        </select>
                    </label>
                </div>
                <div className='flex flex-row mt-4'>
                <label>
                    Body:
                </label>
                    <textarea
                        rows={1}
                        className="text-white border-b bg-inherit"
                    />
                </div>
                
                <button type='submit' className='w-10 mt-4 text-purple-800 bg-white rounded hover:text-white hover:bg-purple-800'>Post</button>
            </form>            
        </div>
    )
}
