import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, content, thumbnail, type, url, fileUrl, category, tags, published, featured } = body;

    // Generate base slug from title
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");

    // Ensure slug is unique by checking existing resources
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.resource.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const resource = await prisma.resource.create({
      data: {
        title,
        slug,
        description,
        content,
        thumbnail,
        type,
        url,
        fileUrl,
        category,
        tags,
        published,
        featured,
        author: session.user?.name || "Admin",
      },
    });

    return NextResponse.json(resource);
  } catch (error) {
    console.error("Error creating resource:", error);
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}
