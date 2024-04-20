const { PrismaClient } = require("@prisma/client");

export const prisma = new PrismaClient();

const categories = ["Buty", "Płaszcze", "Spodnie"];

// async function main() {
//   console.log(`Start seeding ...`);
//   for (const u of categories) {
//     const cat = await prisma.category.create({
//       data: { name: u },
//     });
//     console.log(`Created user with id: ${cat.id}`);
//   }
//   console.log(`Seeding finished.`);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
