import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma/prisma";

export async function POST(req) {
  try {
    const { productId } = await req.json();

    const cookiesStore = cookies();
    const basketId = cookiesStore.get("basketId");

    const result = await prisma.$transaction(async (transaction) => {
      const existingItem = await transaction.orderItem.findFirst({
        where: {
          orderId: Number(basketId.value),
          productId: productId,
        },
      });

      if (existingItem) {
        return await transaction.orderItem.update({
          where: {
            id: existingItem.id,
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        });
      } else {
        const product = await transaction.product.findUnique({
          where: {
            id: productId,
          },
        });

        return await transaction.orderItem.create({
          data: {
            orderId: Number(basketId.value),
            productId: productId,
            quantity: 1,
            price: product.price,
          },
        });
      }
    });

    return Response.json({ data: result });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Bład serwera" }), 500);
  }
}
