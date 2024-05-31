import { prisma } from "@/app/lib/prisma/prisma";

export async function GET(_req, { params }) {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: Number(params.categoryId),
      },
    });

    return Response.json({ data: products });
  } catch {
    return new Response(JSON.stringify({ error: "Bład serwera" }), 500);
  }
}
