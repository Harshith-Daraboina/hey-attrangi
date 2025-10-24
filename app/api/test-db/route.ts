import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    return Response.json({ 
      success: true, 
      userCount,
      message: 'Database connection successful'
    });
  } catch (error) {
    console.error('Database test error:', error);
    return Response.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false 
    }, { status: 500 });
  }
}
