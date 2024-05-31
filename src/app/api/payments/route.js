import { prisma } from "@/app/lib/prisma/prisma";

export async function GET() {
  try {
    const paymentMethods = await prisma.paymentMethodType.findMany();

    return Response.json({ data: paymentMethods });
  } catch {
    return new Response(JSON.stringify({ error: "Bład serwera" }), 500);
  }
}
