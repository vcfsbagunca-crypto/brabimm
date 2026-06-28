import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderId = body.order_id || body.external_reference;
    const status = body.status?.toLowerCase();

    if (!orderId || !status) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
    }

    if (status === "approved" || status === "completed" || status === "paid") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "paid", lowifyId: body.id?.toString() || null },
      });
    } else if (status === "refunded" || status === "cancelled" || status === "rejected") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "cancelled" },
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}