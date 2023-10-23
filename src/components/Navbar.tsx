import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {ChevronDown} from '@styled-icons/bootstrap/ChevronDown'
import { api } from '~/utils/api'
import {Menu2Outline} from '@styled-icons/evaicons-outline/Menu2Outline';
import { CloseOutline } from 'styled-icons/evaicons-outline'
import { Github } from 'styled-icons/boxicons-logos'
import { Linkedin } from 'styled-icons/bootstrap'

export const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [menu, setMenu] = useState(false)
    const categories = api.categories.get.useQuery();

    return (
        <nav className='flex bg-inherit text-white'>
            {/* desktop */}
            <div className='sm:flex hidden justify-between items-center w-full z-40'>
                <div className="sm:flex sm:flex-row mt-2">
                    <Link href={'https://www.linkedin.com/in/adriangarciarios/'} target='_blank'><Linkedin size={35} /></Link>
                    <Link href={'https://github.com/ako1player'} target='_blank'><Github size={35} /></Link>
                </div>
                <h1 className="text-3xl md:pl-44"><Link href={'/'}>Adrian Blog About Stuff</Link></h1>
                <div className="flex">
                    <Link href={'/'} className='mx-2'>Home</Link>
                    <div className='relative'>
                        <Link href={''} className='mx-2' onMouseEnter={()=>setToggle(!toggle)}>Categories<ChevronDown size="15"/></Link>
                        {toggle && 
                            <div className='flex flex-col absolute bg-violet-800 rounded ml-4' onMouseLeave={()=>setToggle(!toggle)}>
                                {categories.data?.map((cat)=>(
                                    <Link href={`/${cat.title}`} key={cat.id} className='hover:bg-violet-300'>{cat.title}</Link>
                                ))}
                            </div>
                        }
                    </div>
                    <Link href={'/contact'} className='mx-2'>Contact</Link>
                    <Link href={'/about'} className='mx-2'>About</Link>
                </div>
            </div>
            {/* Mobile */}
            <div className="sm:hidden flex flex-1 justify-between items-center z-40">
                <div className="">Adrians Blog</div>
                <div onClick={()=> setMenu(!menu)}>{menu ? <CloseOutline size={40}/> : <Menu2Outline size={40} />}</div>
                <div className={`${!menu ? 'hidden' : 'flex'} absolute top-5 right-0 my-2`}>
                    <div className='flex flex-col bg-violet-800 rounded'>
                        <div className="flex flex-col">
                            <Link href={'/'} className='mx-2' onClick={()=> setMenu(!menu)}>Home</Link>
                            <div>
                                <span className='mx-2 cursor-pointer' onClick={()=> setToggle(!toggle)}>Categories<ChevronDown size="15"/></span>
                                {toggle && 
                                    <div className='flex flex-col ml-4 border w-auto rounded'>
                                        {categories.data?.map((cat)=>(
                                            <Link href={`/${cat.title}`} key={cat.id} className='hover:bg-violet-300' onClick={()=> {setMenu(!menu), setToggle(!toggle)}}>{cat.title}</Link>
                                        ))}
                                    </div>
                                }
                            </div>
                            <Link href={'/'} className='mx-2' onClick={()=> setMenu(!menu)}>Contact</Link>
                            <Link href={'/'} className='mx-2' onClick={()=> setMenu(!menu)}>About</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}