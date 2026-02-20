const { PrismaClient } = require('./app/generated/prisma');
const prisma = new PrismaClient();

const sampleImages = [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505968409348-bd000797c92e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop"
];

async function main() {
    const resources = await prisma.resource.findMany();
    let count = 0;
    for (let i = 0; i < resources.length; i++) {
        const resource = resources[i];
        if (!resource.thumbnail) {
            const randomImage = sampleImages[i % sampleImages.length];
            await prisma.resource.update({
                where: { id: resource.id },
                data: { thumbnail: randomImage, published: true }
            });
            count++;
        }
    }
    console.log(`Updated ${count} resources with thumbnails.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
