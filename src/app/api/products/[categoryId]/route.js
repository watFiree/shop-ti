import { prisma } from "@/app/lib/prisma/prisma";

export async function GET(_req, { params }) {
  const products = await prisma.product.findMany({
    where: {
      categoryId: Number(params.categoryId),
    },
  });

  return Response.json({ data: products });
}
