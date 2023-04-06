import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";

const CreatePost = () => {
    const { user } = useUser();
    const [content, setContent] = useState<string>("");
    const [showButton, setShowButton] = useState<boolean>(false);

    const handleCreatePost = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
    };

    if (!user) return null;

    return (
        <form
            className="flex flex-col items-end rounded-lg bg-white p-4"
            onSubmit={handleCreatePost}
        >
            <div className="flex w-full items-center gap-4">
                <Image
                    src={user?.profileImageUrl ?? ""}
                    alt="profile-image"
                    width={50}
                    height={50}
                    className="rounded-xl"
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
                className={`duration-250 text-md mt-2 w-fit rounded-md border-2 border-zinc-600 bg-zinc-900 px-6 py-1 font-medium text-white transition-colors hover:bg-zinc-700 ${
                    showButton ? "" : "hidden"
                }`}
            >
                Post
            </button>
        </form>
    );
};

export default CreatePost;
