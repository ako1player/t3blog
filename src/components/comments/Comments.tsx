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
        <div className="text-white pt-2">
        {status === "authenticated" ? (
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <form onSubmit={handleSubmit} className="">
                <textarea
                    ref={textareaRef}
                    className={`rounded w-1/3 overflow-hidden bg-inherit outline-none resize-none h-6 border-b`}
                    placeholder="write a comment..."
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                />
                <button type="submit">Send</button>
            </form>
        ) : (
            <button onClick={()=> signIn()} className="border rounded bg-purple-600 hover:bg-purple-800">Login to write a comment</button>
        )}
        <div className="pt-2 w-1/3 border rounded">
            {isLoading
            ? "loading"
            : data.data?.map((item) => (
                <div key={item.id}>
                    <div>
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
                        <span>{item.user.name}</span>
                        <span>{item.createdAt.toString().slice(3,15)}</span>
                    </div>
                    </div>
                    <p className=" break-words">{item.desc}</p>
                </div>
                ))}
        </div>
        </div>
    );
    };
