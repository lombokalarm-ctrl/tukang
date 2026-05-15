import "server-only";

import { BlogStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

export async function getAdminBlogOverview() {
  const [totalPosts, draftPosts, publishedPosts, latestPosts] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: BlogStatus.DRAFT } }),
    prisma.blogPost.count({ where: { status: BlogStatus.PUBLISHED } }),
    prisma.blogPost.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        keywords: {
          orderBy: { keyword: "asc" },
        },
      },
      take: 10,
    }),
  ]);

  return {
    totalPosts,
    draftPosts,
    publishedPosts,
    latestPosts,
  };
}

export async function getAdminBlogPostById(id: number) {
  return prisma.blogPost.findUnique({
    where: { id },
    include: {
      keywords: {
        orderBy: { keyword: "asc" },
      },
    },
  });
}
