import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCreatePost } from "./useCreatePost";

const CreatePost = () => {
    const { user } = useUser();
    const {
        handleCreatePost,
        isPosting,
        showButton,
        setShowButton,
        content,
        setContent,
    } = useCreatePost();
    const router = useRouter();

    if (!user) return null;

    return (
        <form
            className="flex flex-col items-end rounded-lg border-[0.25px] border-zinc-200 bg-white px-4 py-2"
            onSubmit={handleCreatePost}
        >
            <div className="flex w-full items-center gap-4">
                <Image
                    src={user?.profileImageUrl ?? ""}
                    alt="profile-image"
                    width={45}
                    height={45}
                    role="button"
                    className="rounded-xl transition-opacity duration-200 hover:opacity-80"
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
                    className="h-[50px] w-full grow bg-transparent outline-none"
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
