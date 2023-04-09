import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

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
    getFollowerList: protectedProcedure
        .input(z.object({ followed: z.string() }))
        .query(async ({ ctx, input }) => {
            if (!input.followed || input.followed === "") {
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

            return followerList;
        }),
    getFollowingList: protectedProcedure
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
            });

            return followingList;
        }),
});
