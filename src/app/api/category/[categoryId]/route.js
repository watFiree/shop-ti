import { prisma } from "@/app/lib/prisma/prisma";

export async function GET(_req, { params }) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: Number(params.categoryId),
      },
    });

    return Response.json({ data: category });
  } catch {
    return new Response(JSON.stringify({ error: "Błąd serwera" }), 500);
  }
}
