import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      where: {
        published: true,
      },
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
    });
    return NextResponse.json(resources);
  } catch (error) {
    console.error("Error fetching public resources:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}
