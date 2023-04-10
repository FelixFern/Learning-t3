import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "~/utils/api";

const CreatePost = () => {
    const { user } = useUser();
    const ctx = api.useContext();
    const router = useRouter();
    const [content, setContent] = useState<string>("");
    const [showButton, setShowButton] = useState<boolean>(false);

    const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
        onSuccess: () => {
            setContent("");
            void ctx.posts.getAllPosts.invalidate();
        },
    });

    const handleCreatePost = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        mutate({ content: content });
    };

    if (!user) return null;

    return (
        <form
            className="flex flex-col items-end rounded-lg border-[1px] border-zinc-200 bg-white p-4"
            onSubmit={handleCreatePost}
        >
            <div className="flex w-full items-center gap-4">
                <Image
                    src={user?.profileImageUrl ?? ""}
                    alt="profile-image"
                    width={50}
                    height={50}
                    className="rounded-xl"
                    onClick={() => {
                        router
                            .push(`/profile/${user?.username ?? ""}`)
                            .catch((err) => {
                                console.error(err);
                            });
                    }}
                ></Image>
                <input
                    type="text"
                    placeholder="What facts do you have today?"
                    className="h-[50px] w-full grow outline-none"
                    onFocus={() => {
                        setShowButton(true);
                    }}
                    onBlur={() => {
                        setShowButton(false);
                    }}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    value={content}
                />
            </div>
            <button
                type="submit"
                className={`duration-250 text-md mt-2 w-fit rounded-md bg-zinc-900 px-6 py-1 font-medium text-white transition-colors hover:bg-zinc-700 disabled:border-zinc-500 disabled:bg-zinc-400 ${
                    showButton || content != "" ? "" : "hidden"
                }`}
                disabled={isPosting}
            >
                Post
            </button>
        </form>
    );
};

export default CreatePost;
