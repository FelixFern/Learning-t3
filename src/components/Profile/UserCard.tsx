import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

type UserType = {
    id?: string;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    profileImageUrl?: string;
};

const UserCard = ({ userData }: { userData: UserType }) => {
    const router = useRouter();
    const user = useUser();
    const ctx = api.useContext();

    const { mutate, isLoading: isTryFollowing } = api.follow.follow.useMutation(
        {
            onSuccess: () => {
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

    const [isFollowing, setIsFollowing] = useState(false);
    const [isSelf, setIsSelf] = useState(false);

    useEffect(() => {
        if (user.user?.id) {
            if (user.user?.id === userData.id) {
                setIsSelf(true);
            }
        }
        if (followingData?.some((val) => val.id === userData.id))
            return setIsFollowing(true);
    }, [user]);

    return (
        <div className="flex items-center gap-4 p-2">
            <Image
                src={userData?.profileImageUrl ?? ""}
                alt="profile-image"
                width={50}
                height={50}
                className="duration-250 rounded-xl transition-opacity hover:opacity-75"
                role="button"
                onClick={() => {
                    router
                        .push(`/profile/${userData?.username ?? ""}`)
                        .catch((err) => {
                            console.error(err);
                        });
                }}
            ></Image>
            <div className="flex w-full items-center justify-between">
                <div>
                    <h1 className="font-bold">
                        {[userData.firstName, userData.lastName].join(" ")}
                    </h1>
                    <p className="text-md mt-[-4px] text-gray-400">
                        {userData?.username
                            ? `@${userData?.username}`
                            : "@user"}
                    </p>
                </div>
                {user && !isSelf ? (
                    <>
                        {isFollowing ? (
                            <button
                                className="duration-250 mt-1 rounded-md border-2 border-zinc-900 px-4 py-1 text-sm font-medium text-black transition-colors hover:bg-zinc-700 hover:text-white"
                                onClick={() => {
                                    handleFollow();
                                }}
                                disabled={isTryFollowing}
                            >
                                Folded
                            </button>
                        ) : (
                            <button
                                className="duration-250 mt-1 rounded-md border-2 border-zinc-600 bg-zinc-900 px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:border-zinc-500 disabled:bg-zinc-400"
                                onClick={() => {
                                    handleFollow();
                                }}
                                disabled={isTryFollowing}
                            >
                                Fold
                            </button>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default UserCard;
