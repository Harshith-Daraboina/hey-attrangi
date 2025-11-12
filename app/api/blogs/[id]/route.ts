import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        reviews: {
          orderBy: {
            createdAt: "desc",
          },
          take: 50, // Limit reviews to improve performance
        },
      },
    });

    if (!blog || !blog.published) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { 
      title, 
      slug, 
      content, 
      excerpt, 
      image, 
      author,
      published,
      featured,
      tumblineQuestion,
      tumblineLine,
      mainContent,
      disorderRelation,
      question,
      subquestions,
      summary,
      sourceLink
    } = body;

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        image: image || null,
        author: author || null,
        tumblineQuestion: tumblineQuestion || null,
        tumblineLine: tumblineLine || null,
        mainContent: mainContent || null,
        disorderRelation: disorderRelation || null,
        question: question || null,
        subquestions: subquestions || [],
        summary: summary || null,
        sourceLink: sourceLink || null,
        published: published || false,
        featured: featured !== undefined ? featured : false,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

