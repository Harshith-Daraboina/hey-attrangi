import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        excerpt: true,
        image: true,
        author: true,
        likes: true,
        views: true,
        createdAt: true,
        published: true,
        tumblineQuestion: true,
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching public blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

