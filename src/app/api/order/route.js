import { prisma } from "@/app/lib/prisma/prisma";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { productId } = await req.json();

    const product = await prisma.product.findFirst({
      where: {
        id: Number(productId),
      },
    });

    const order = await prisma.order.create({
      data: {
        items: {
          create: [
            {
              product: {
                connect: { id: Number(productId) },
              },
              quantity: 1,
              price: product.price,
            },
          ],
        },
        status: "Creating",
      },
    });

    cookies().set("basketId", order.id, { expires: Date.now() + 604800 });
    return Response.json({ data: order });
  } catch {
    return new Response(JSON.stringify({ error: "Bład serwera" }), 500);
  }
}

export async function PUT(req) {
  try {
    const { productId } = await req.json();

    const cookiesStore = cookies();
    const { basketId } = cookiesStore.get("basketId");

    const result = await prisma.$transaction(async (transaction) => {
      const existingItem = await transaction.orderItem.findFirst({
        where: {
          orderId: basketId,
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
            orderId: basketId,
            productId: productId,
            quantity: 1,
            price: product.price,
          },
        });
      }
    });

    return Response.json({ data: result });
  } catch {
    return new Response(JSON.stringify({ error: "Bład serwera" }), 500);
  }
}
