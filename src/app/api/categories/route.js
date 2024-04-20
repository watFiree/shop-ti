import { prisma } from "@/app/lib/prisma/prisma";

export async function GET() {
  const allCategories = await prisma.category.findMany();

  return Response.json({ data: allCategories });
}
