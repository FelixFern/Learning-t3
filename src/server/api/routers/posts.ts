import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
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

export const postsRouter = createTRPCRouter({
    getAllPosts: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.post.findMany({
            orderBy: [
                {
                    createdAt: "desc",
                },
            ],
            take: 100,
        });

        const users = (
            await clerkClient.users.getUserList({
                userId: posts.map((post) => post.authorId),
                limit: 100,
            })
        ).map(filterUserForClient);

        return posts.map((post) => ({
            post,
            author: users.find((user) => user.id === post.authorId),
        }));
    }),
    getPostById: publicProcedure
        .input(z.object({ authorId: z.string() }))
        .query(async ({ ctx, input }) => {
            const posts = await ctx.prisma.post.findMany({
                where: {
                    authorId: {
                        equals: input.authorId,
                    },
                },
                orderBy: [
                    {
                        createdAt: "desc",
                    },
                ],
                take: 100,
            });

            const users = (
                await clerkClient.users.getUserList({
                    userId: posts.map((post) => post.authorId),
                    limit: 100,
                })
            ).map(filterUserForClient);

            return posts.map((post) => ({
                post,
                author: users.find((user) => user.id === post.authorId),
            }));
        }),
    create: protectedProcedure
        .input(
            z.object({
                content: z.string().max(280),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.currentUser;
            const post = await ctx.prisma.post.create({
                data: {
                    authorId,
                    content: input?.content,
                },
            });

            return post;
        }),
});
