import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma/prisma";

export const revalidate = true;

export async function POST(req, { params }) {
  const orderId = Number(params.orderId);
  const { paymentMethodId } = await req.json();

  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        paymentTypeId: paymentMethodId,
      },
    });

    console.log(updatedOrder);
    revalidatePath("/koszyk", "page");
    return Response.json({
      revalidated: true,
      now: Date.now(),
      data: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    return Response.error({ data: updatedOrder });
  }
}
