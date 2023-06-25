import { useState } from "react";
import { api } from "~/utils/api";

export const useCreatePost = () => {
    const ctx = api.useContext();
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

    return {
        handleCreatePost,
        isPosting,
        showButton,
        setShowButton,
        content,
        setContent,
    };
};
