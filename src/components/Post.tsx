import { User } from "@clerk/nextjs/dist/api";
import { Post } from "@prisma/client";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

type Author = {
    id: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    profileImageUrl: string | null;
};

const Post = ({ post, author }: { post: Post; author: Author | undefined }) => {
    return (
        <div className="h-fit rounded-md bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image
                        src={author?.profileImageUrl ?? ""}
                        alt="profile-image"
                        width={35}
                        height={35}
                        className="rounded-xl"
                    ></Image>
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold">
                            {author?.firstName != ""
                                ? [author?.firstName, author?.lastName].join(
                                      " "
                                  )
                                : "Anonymous"}
                        </h1>
                        <span className="mt-[-8px] text-xs text-gray-400">
                            {author?.id != "" ? author?.id : "user"}
                        </span>
                    </div>
                </div>
                <p className="text-sm font-extralight">
                    {dayjs(post.createdAt).fromNow()}
                </p>
            </div>
            <p>{post.content}</p>
        </div>
    );
};

export default Post;
