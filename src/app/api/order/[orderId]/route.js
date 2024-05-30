import { prisma } from "@/app/lib/prisma/prisma";

export const revalidate = true;

export async function GET(_req, { params }) {
  const orderId = Number(params.orderId);

  if (!orderId) {
    return Response.json({ data: {} });
  }

  const wholeOrder = await prisma.order.findUnique({
    where: { id: Number(orderId) },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      deliveryAddress: true,
      courierType: true,
      paymentType: true,
    },
  });

  const products = (wholeOrder?.items || []).map((item) => ({
    productBasketId: item.id,
    productId: item.productId,
    productName: item.product.name,
    productPrice: item.product.price,
    quantity: item.quantity,
  }));

  let totalPrice = 0;
  totalPrice += products.reduce(
    (acc, cur) => acc + cur.productPrice * cur.quantity,
    0
  );
  totalPrice += wholeOrder.courierType?.price || 0;
  totalPrice += wholeOrder.paymentType?.price || 0;

  return Response.json({ data: { ...wholeOrder, products, totalPrice } });
}
