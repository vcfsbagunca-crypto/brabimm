import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = body.webhook_event_type as string;
    const orderId = body.order_id as string;
    const email = body.Customer?.email as string;

    if (!eventType || !orderId) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    if (eventType === "order_approved") {
      if (!email) {
        return NextResponse.json({ error: "Email do comprador obrigatório" }, { status: 400 });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
      }

      const existing = await prisma.order.findFirst({
        where: { lowifyId: orderId },
      });
      if (existing) {
        return NextResponse.json({ received: true, alreadyProcessed: true });
      }

      await prisma.order.create({
        data: {
          userId: user.id,
          amount: 24.99,
          plan: "lifetime",
          status: "paid",
          lowifyId: orderId,
        },
      });

      console.log(`[Kiwify] Venda aprovada! ${email} — R$ 24,99 (order: ${orderId})`);
    } else if (eventType === "order_refunded") {
      const order = await prisma.order.findFirst({
        where: { lowifyId: orderId },
      });
      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "cancelled" },
        });
        console.log(`[Kiwify] Reembolso: ${orderId}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[Kiwify] Webhook error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
