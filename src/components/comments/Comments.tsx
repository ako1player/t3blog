"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import { NextPage } from "next";
    
    export const Comments: NextPage<{postSlug: string}> = ({postSlug}) => {
    const { status } = useSession();

    const [desc, setDesc] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const data = api.comments.get.useQuery(postSlug);
    const postComment = api.comments.postComment.useMutation();
    
    //ADD COMMENTS
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        postComment.mutateAsync({desc: desc, postSlug: postSlug});
        setDesc("");
        await data.refetch();
    };

    return (
        <div className="text-white">
        <h1>Comments</h1>
        {status === "authenticated" ? (
            <form onSubmit={handleSubmit}>
            <textarea
            className="text-black"
                placeholder="write a comment..."
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
            />
            <button type="submit">Send</button>
            </form>
        ) : (
            <Link href="/login">Login to write a comment</Link>
        )}
        <div>
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
                    <p>{item.desc}</p>
                </div>
                ))}
        </div>
        </div>
    );
    };
