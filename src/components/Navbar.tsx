import React, { useState } from 'react'
import Link from 'next/link'
import {ChevronDown} from '@styled-icons/bootstrap/ChevronDown'
import { api } from '../utils/api'
import {Menu2Outline} from '@styled-icons/evaicons-outline/Menu2Outline';
import { CloseOutline } from 'styled-icons/evaicons-outline'
import { Github } from 'styled-icons/boxicons-logos'
import { Linkedin } from 'styled-icons/bootstrap'
import { useSession } from 'next-auth/react';

export const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [menu, setMenu] = useState(false)
    const categories = api.categories.get.useQuery();
    const { data: sessionData} = useSession();
    //TODO:
    //Make logic to only let users with admin right able to see create post
    const user = api.users.getUser.useQuery();
    const isAdmin = user.data?.filter((u) => {
        if(u.id === sessionData?.user.id && u.role ==='Admin'){
            return u;
        }
    })

    return (
        <nav className='flex text-white bg-inherit'>
            {/* desktop */}
            <div className='z-40 items-center justify-around hidden w-full sm:flex'>
                <div className="mt-2 sm:flex sm:flex-row">
                    <Link href={'/'} className="text-3xl pr-2 hover:text-purple-400">A-Blog | </Link>
                    <Link href={'https://www.linkedin.com/in/adriangarciarios/'} target='_blank'><Linkedin size={35} /></Link>
                    <Link href={'https://github.com/ako1player'} target='_blank'><Github size={35} /></Link>
                </div>
                <div className="flex">
                    <Link href={'/'} className='mx-2 hover:text-purple-400'>Home</Link>
                    <div className='relative'>
                        <p className='mx-2 cursor-pointer hover:text-purple-400' onClick={()=>setToggle(!toggle)}>Categories<ChevronDown size="15"/></p>
                        {toggle && 
                            <div className='absolute flex flex-col ml-4 rounded bg-violet-800' onMouseLeave={()=>setToggle(!toggle)}>
                                {categories.data?.map((cat)=>(
                                    <Link href={`/${cat.title}`} key={cat.id} className='hover:bg-violet-300'>{cat.title}</Link>
                                ))}
                            </div>
                        }
                    </div>
                    {isAdmin?.length !== 0 && isAdmin ? 
                    <Link href='/addPost' className='text-purple-800 bg-white rounded hover:text-white hover:bg-purple-800'>Create A New Post</Link>
                    :
                    ''
                    }
                </div>
            </div>
            {/* Mobile */}
            <div className="z-40 flex items-center justify-between flex-1 sm:hidden">
                <div className="">Adrians Blog</div>
                <Link href='/addPost' className='text-purple-800 bg-white rounded hover:text-white hover:bg-purple-800'>Create A New Post</Link>
                <div onClick={()=> setMenu(!menu)}>{menu ? <CloseOutline size={40}/> : <Menu2Outline size={40} />}</div>
                <div className={`${!menu ? 'hidden' : 'flex'} absolute top-5 right-0 my-2`}>
                    <div className='flex flex-col rounded bg-violet-800'>
                        <div className="flex flex-col">
                            <Link href={'/'} className='mx-2' onClick={()=> setMenu(!menu)}>Home</Link>
                            <div>
                                <span className='mx-2 cursor-pointer' onClick={()=> setToggle(!toggle)}>Categories<ChevronDown size="15"/></span>
                                {toggle && 
                                    <div className='flex flex-col w-auto ml-4 border rounded'>
                                        {categories.data?.map((cat)=>(
                                            <Link href={`/${cat.title}`} key={cat.id} className='hover:bg-violet-300' onClick={()=> {setMenu(!menu), setToggle(!toggle)}}>{cat.title}</Link>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}