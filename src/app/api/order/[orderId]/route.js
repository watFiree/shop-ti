import { prisma } from "@/app/lib/prisma/prisma";
import { cookies } from "next/headers";

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

  const roundedTotalPrice = Math.round(totalPrice * 100) / 100;

  return Response.json({
    data: {
      ...wholeOrder,
      products,
      totalPrice: roundedTotalPrice,
    },
  });
}

export async function PUT(req, { params }) {
  const orderId = Number(params.orderId);

  try {
    const { deliveryAddressData } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) },
      include: {
        courierType: true,
        paymentType: true,
      },
    });

    console.log(order, deliveryAddressData);

    if (order.courierTypeId === null) {
      return new Response(
        JSON.stringify({ error: "Wybór kuriera jest wymagany" }),
        { status: 400 }
      );
    }

    if (order.paymentTypeId === null) {
      return new Response(
        JSON.stringify({ error: "Wybór płatności jest wymagany" }),
        { status: 400 }
      );
    }

    await prisma.deliveryAddress.create({
      data: {
        orderId: orderId,
        firstName: deliveryAddressData.name,
        surname: deliveryAddressData.surname,
        addressLine: deliveryAddressData.address,
        city: deliveryAddressData.city,
        postalCode: deliveryAddressData.postalCode,
        phoneNumber: deliveryAddressData.phone,
      },
    });

    await prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        status: "Placed",
      },
    });

    cookies().delete("basketId");
    return Response.json({ message: "Order placed" });
  } catch (error) {
    console.log(error);
  }
}
