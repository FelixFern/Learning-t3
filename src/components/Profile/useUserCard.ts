import { useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/api";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { UserType } from "./UserCard";

export const useUserCard = ({ userData: userData }: { userData: UserType }) => {
    const user = useUser();
    const ctx = api.useContext();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isSelf, setIsSelf] = useState(false);

    const { mutate, isLoading: isTryFollowing } = api.follow.follow.useMutation(
        {
            onSuccess: () => {
                setIsFollowing(!isFollowing);
                void ctx.follow.getFollowerList.invalidate();
            },
        }
    );

    const { data: followingData } = api.follow.getFollowingList.useQuery({
        follower: user.user?.id.toString() ?? "",
    });

    const handleFollow = () => {
        mutate({
            followed: userData.id?.toString() ?? "",
            follower: user.user?.id.toString() ?? "",
        });
        return;
    };

    useEffect(() => {
        if (user.user?.id === userData.id) {
            setIsSelf(true);
        }
        if (
            followingData?.following_list?.some(
                (val: UserType) => val.id === userData.id
            )
        )
            return setIsFollowing(true);
    }, [followingData?.following_list, user, userData.id]);

    return {
        followingData,
        isTryFollowing,
        isFollowing,
        user,
        isSelf,
        handleFollow,
    };
};
