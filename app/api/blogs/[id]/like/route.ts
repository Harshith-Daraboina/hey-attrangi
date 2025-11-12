import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.update({
      where: {
        id: id,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true, likes: blog.likes });
  } catch (error) {
    console.error("Error incrementing likes:", error);
    return NextResponse.json({ error: "Failed to increment likes" }, { status: 500 });
  }
}

