import { prisma } from "@/app/lib/prisma/prisma";

export async function GET() {
  try {
    const allCategories = await prisma.category.findMany();

    return Response.json({ data: allCategories });
  } catch {
    return new Response(JSON.stringify({ error: "Błąd serwera" }), 500);
  }
}
