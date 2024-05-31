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
