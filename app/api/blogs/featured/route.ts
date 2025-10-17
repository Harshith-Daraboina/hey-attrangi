import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
        featured: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        image: true,
        author: true,
        likes: true,
        views: true,
        createdAt: true,
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    return NextResponse.json({ error: "Failed to fetch featured blogs" }, { status: 500 });
  }
}

