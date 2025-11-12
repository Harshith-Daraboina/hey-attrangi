import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, comment, rating, blogId } = body;

    // Use blogId from body if provided, otherwise use id from params
    const finalBlogId = blogId || id;

    // Verify the blog exists
    const blog = await prisma.blog.findUnique({
      where: {
        id: finalBlogId,
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        blogId: finalBlogId,
        name,
        email,
        comment,
        rating: parseInt(rating),
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}

