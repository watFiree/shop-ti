import { prisma } from "@/app/lib/prisma/prisma";

export async function GET(_req, { params }) {
  const basketId = Number(params.orderId);

  if (!basketId) {
    return Response.json({ data: { products: [], totalPrice: 0 } });
  }

  const orderWithProducts = await prisma.order.findUnique({
    where: { id: Number(basketId) },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const products = orderWithProducts.items.map((item) => ({
    productBasketId: item.id,
    productId: item.productId,
    productName: item.product.name,
    productPrice: item.product.price,
  }));

  const totalPrice = products.reduce((acc, cur) => acc + cur.productPrice, 0);

  return Response.json({ data: { products, totalPrice } });
}
