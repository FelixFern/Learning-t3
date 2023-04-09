import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
    getProfileByUsername: publicProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const [user] = await clerkClient.users.getUserList({
                username: [input.username],
            });
            if (!user) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "User not found!",
                });
            }

            const posts = await ctx.prisma.post.findMany({
                where: {
                    authorId: {
                        equals: user?.id?.toString() ?? "",
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            return {
                user: user,
                posts: posts.map((post) => ({
                    post,
                    author: user,
                })),
            };
        }),
});
