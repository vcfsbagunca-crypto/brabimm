import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-webhook-secret");
    if (!secret || secret !== process.env.LOWIFY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const event = body.event as string;
    const saleId = body.sale_id as string;
    const email = body.customer?.email as string;

    if (!event || !saleId) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    if (!["sale.paid", "sale.refund"].includes(event)) {
      return NextResponse.json({ received: true });
    }

    if (event === "sale.paid") {
      if (!email || typeof email !== "string" || !email.includes("@")) {
        return NextResponse.json({ error: "Email inválido" }, { status: 400 });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
      }

      const existing = await prisma.order.findFirst({ where: { lowifyId: saleId } });
      if (existing) {
        return NextResponse.json({ received: true, alreadyProcessed: true });
      }

      await prisma.order.create({
        data: {
          userId: user.id,
          amount: 24.99,
          plan: "lifetime",
          status: "paid",
          lowifyId: saleId,
        },
      });
    } else if (event === "sale.refund") {
      const order = await prisma.order.findFirst({ where: { lowifyId: saleId } });
      if (order) {
        await prisma.order.update({ where: { id: order.id }, data: { status: "cancelled" } });
      }
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
