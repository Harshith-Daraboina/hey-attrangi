const { PrismaClient } = require('./app/generated/prisma');
const prisma = new PrismaClient();

async function main() {
    const resources = await prisma.resource.findMany({
        select: { id: true, title: true, type: true, thumbnail: true }
    });
    console.log(JSON.stringify(resources, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
