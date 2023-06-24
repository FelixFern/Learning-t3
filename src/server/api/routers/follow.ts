import { clerkClient, type User } from "@clerk/nextjs/dist/api";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
    return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
    };
};

export const followRouter = createTRPCRouter({
    follow: protectedProcedure
        .input(z.object({ follower: z.string(), followed: z.string() }))
        .mutation(async ({ ctx, input }) => {
            if (
                !input.followed ||
                !input.follower ||
                input.followed === "" ||
                input.follower === ""
            ) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Follower or followed is null!",
                });
            }
            const followerList = await ctx.prisma.following.findMany({
                where: {
                    followed: input.followed,
                },
            });

            let unfollowPrimaryKey = null;

            followerList?.map((data) => {
                console.log(data);
                if (data.follower === input.follower)
                    unfollowPrimaryKey = data.id;
            });

            if (unfollowPrimaryKey) {
                console.log("test");
                const unfollow = await ctx.prisma.following.delete({
                    where: {
                        id: unfollowPrimaryKey,
                    },
                });
                return unfollow;
            }

            const follow = await ctx.prisma.following.create({
                data: {
                    followed: input?.followed,
                    follower: input?.follower,
                },
            });
            return follow;
        }),

    getFollowerList: publicProcedure
        .input(z.object({ followed: z.string() }))
        .query(async ({ ctx, input }) => {
            if (!input.followed || input.followed === "") {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Follower or followed is null!",
                });
            }
            const followingList = await ctx.prisma.following.findMany({
                where: {
                    followed: input.followed,
                },
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    follower: true,
                },
            });

            const user = (
                await clerkClient.users.getUserList({
                    limit: 100,
                })
            )
                .filter((u) => {
                    return followingList.some((val) => val.follower === u.id);
                })
                .map(filterUserForClient);

            return {
                num_of_follower: user.length,
                follower_list: user,
            };
        }),
    getFollowingList: publicProcedure
        .input(z.object({ follower: z.string() }))
        .query(async ({ ctx, input }) => {
            if (!input.follower || input.follower === "") {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Follower or followed is null!",
                });
            }

            const followingList = await ctx.prisma.following.findMany({
                where: {
                    follower: input.follower,
                },
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    followed: true,
                },
            });

            const user = (
                await clerkClient.users.getUserList({
                    limit: 100,
                })
            )
                .filter((u) => {
                    return followingList.some((val) => val.followed === u.id);
                })
                .map(filterUserForClient);

            return {
                num_of_following: user.length,
                following_list: user,
            };
        }),
});
