import { prisma } from "@/app/lib/prisma/prisma";

export async function GET() {
  const couriers = await prisma.courierType.findMany();

  return Response.json({ data: couriers });
}
