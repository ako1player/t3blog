"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import { NextPage } from "next";
import { signIn } from "next-auth/react";

export const Comments: NextPage<{postSlug: string}> = ({postSlug}) => {
    const { status } = useSession();

    const [desc, setDesc] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const data = api.comments.get.useQuery(postSlug);
    const postComment = api.comments.postComment.useMutation();
    
    //ADD COMMENTS
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await postComment.mutateAsync({desc: desc, postSlug: postSlug});
        setDesc("");
        await data.refetch();
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "h-6";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [desc]);

    return (
        <div className="pt-2 text-white">
        {status === "authenticated" ? (
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <form onSubmit={handleSubmit} className="flex items-end mb-1">
                <textarea
                    ref={textareaRef}
                    className={`w-full sm:w-1/3 overflow-hidden bg-inherit outline-none resize-none border-b h-6`}
                    placeholder="write a comment..."
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                />
                <button type="submit" className="hover:text-white hover:bg-inherit border rounded bg-white text-purple-800 text-sm w-10">Post</button>    
            </form>
        ) : (
            <button onClick={()=>signIn()} className="w-full bg-violet-800 border rounded hover:bg-purple-800 sm:w-1/3">Login to write a comment</button>
        )}
        <div className="w-full border rounded sm:w-1/3">
            {data.data?.length === 0 ? <p className="text-center align-middle">No Comments</p> :
                isLoading
                    ? "loading" 
                    : data.data?.map((item) => (
                        <div key={item.id}>
                            <div className="pt-1 pl-1">
                            {item?.user?.image && (
                                <Image
                                src={item.user.image}
                                alt=""
                                width={50}
                                height={50}
                                className="rounded-lg"
                                />
                            )}
                            <div>
                                <span>{item.user.name} |</span>
                                <span>{item.createdAt.toString().slice(3,15)}</span>
                            </div>
                            <p className="break-words">{item.desc}</p>
                            </div>
                        </div>
                        ))
            }
        </div>
        </div>
    );
    };
