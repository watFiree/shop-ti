import { prisma } from "@/app/lib/prisma/prisma";

export async function GET() {
  const paymentMethods = await prisma.paymentMethodType.findMany();

  return Response.json({ data: paymentMethods });
}
