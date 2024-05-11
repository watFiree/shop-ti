const { PrismaClient } = require("@prisma/client");

export const prisma = new PrismaClient();

// const categories = ["Buty", "Płaszcze", "Spodnie"];
// const prooducts = [
//   {
//     name: "Adidas Buty",
//     price: 100,
//     categoryId: 1,
//     description: "Adidas Buty opis",
//   },
//   {
//     name: "Ochnik Płaszcze",
//     price: 200,
//     categoryId: 2,
//     description: "Ochnik Płaszcze opis",
//   },
//   {
//     name: "Nike Spodnie",
//     price: 300,
//     categoryId: 3,
//     description: "Nike Spodnie opis",
//   },
// ];

// async function main() {
//   console.log(`Start seeding ...`);
//   for (const u of prooducts) {
//     const cat = await prisma.product.create({
//       data: u,
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
// });
