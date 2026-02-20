const { PrismaClient } = require('./app/generated/prisma');
const prisma = new PrismaClient();
async function main() {
    const blogs = await prisma.blog.findMany({ select: { image: true }, take: 5 });
    console.log(JSON.stringify(blogs, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
