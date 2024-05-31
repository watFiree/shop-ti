import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma/prisma";

export const revalidate = true;

export async function POST(req, { params }) {
  const orderId = Number(params.orderId);
  const { courierId } = await req.json();
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        courierTypeId: courierId,
      },
    });

    revalidatePath("/koszyk", "page");
    return Response.json({
      revalidated: true,
      now: Date.now(),
      data: updatedOrder,
    });
  } catch {
    return new Response(JSON.stringify({ error: "Bład serwera" }), 500);
  }
}
