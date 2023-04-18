import { Post } from "@prisma/client";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);

type Author = {
    id: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    profileImageUrl: string | null;
};

const Post = ({ post, author }: { post: Post; author: Author | undefined }) => {
    const router = useRouter();
    return (
        <div className="h-fit rounded-md border-[0.25px] border-zinc-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        src={author?.profileImageUrl ?? ""}
                        alt="profile-image"
                        width={40}
                        height={40}
                        className="duration-250 rounded-xl transition-opacity hover:opacity-75"
                        role="button"
                        onClick={() => {
                            router
                                .push(`/profile/${author?.username ?? ""}`)
                                .catch((err) => {
                                    console.error(err);
                                });
                        }}
                    ></Image>
                    <div className="flex flex-col gap-2">
                        <h1 className="flex items-center gap-2 font-bold">
                            {author?.firstName != ""
                                ? [author?.firstName, author?.lastName].join(
                                      " "
                                  )
                                : "Anonymous"}
                            <p className="text-sm font-extralight text-gray-500">
                                •
                            </p>
                            <p className="text-sm font-extralight text-gray-500">
                                {dayjs(post.createdAt).fromNow()}
                            </p>
                        </h1>
                        <span className="text-md mt-[-12px] text-gray-400">
                            {author?.username
                                ? `@${author?.username}`
                                : "@user"}
                        </span>
                    </div>
                </div>
            </div>
            <p>{post.content}</p>
        </div>
    );
};

export default Post;
