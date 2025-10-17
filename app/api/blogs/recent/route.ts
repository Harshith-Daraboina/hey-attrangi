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
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        createdAt: true,
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching recent blogs:", error);
    return NextResponse.json({ error: "Failed to fetch recent blogs" }, { status: 500 });
  }
}

