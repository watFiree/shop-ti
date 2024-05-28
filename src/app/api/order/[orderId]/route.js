import { prisma } from "@/app/lib/prisma/prisma";

export async function GET(_req, { params }) {
  const orderId = Number(params.orderId);
  console.log(params.orderId);

  if (!orderId) {
    return Response.redirect("/");
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
      customerData: true,
    },
  });

  const products = wholeOrder.items.map((item) => ({
    productBasketId: item.id,
    productId: item.productId,
    productName: item.product.name,
    productPrice: item.product.price,
  }));

  const totalPrice = products.reduce((acc, cur) => acc + cur.productPrice, 0);

  return Response.json({ data: { ...wholeOrder, products, totalPrice } });
}
