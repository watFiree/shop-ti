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

// async function main() {
//   const couriers = [
//     { name: "Przelewy24", price: 3.99 },
//     { name: "Karta płatnicza", price: 1.99 },
//     { name: "Przelew tradycyjny", price: 0 },
//     { name: "Przy odbiorze", price: 0 },
//   ];

//   try {
//     for (let courier of couriers) {
//       const addedCourier = await prisma.paymentMethodType.create({
//         data: {
//           name: courier.name,
//           price: courier.price,
//         },
//       });
//       console.log(
//         `Added Courier: ${addedCourier.name} with price ${addedCourier.price}`
//       );
//     }
//   } catch (error) {
//     console.error("Error adding couriers:", error);
//   }
// }

// async function main() {
//   await prisma.courierType.deleteMany({
//     where: {
//       id: {
//         gte: 18,
//       },
//     },
//   });
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
