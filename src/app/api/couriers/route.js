import { prisma } from "@/app/lib/prisma/prisma";

export async function GET() {
  try {
    const couriers = await prisma.courierType.findMany();

    return Response.json({ data: couriers });
  } catch {
    return new Response(JSON.stringify({ error: "Błąd serwera" }), 500);
  }
}
