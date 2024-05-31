import { prisma } from "@/app/lib/prisma/prisma";

export async function GET(_req, { params }) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: Number(params.productId),
      },
    });

    return Response.json({ data: product });
  } catch {
    return new Response(JSON.stringify({ error: "Bład serwera" }), 500);
  }
}
