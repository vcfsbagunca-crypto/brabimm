import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

function verifyKiwifySignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature || !secret) return false;
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  return expected === signature;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-kiwify-signature") || req.headers.get("x-webhook-signature");

    const webhookSecret = process.env.KIWIFY_WEBHOOK_SECRET;
    if (webhookSecret && !verifyKiwifySignature(rawBody, signature, webhookSecret)) {
      return NextResponse.json({ error: "Assinatura inválida" }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
    const eventType = body.webhook_event_type as string;
    const orderId = body.order_id as string;
    const email = body.Customer?.email as string;

    if (!eventType || !orderId) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    if (!["order_approved", "order_refunded"].includes(eventType)) {
      return NextResponse.json({ received: true });
    }

    if (eventType === "order_approved") {
      if (!email || typeof email !== "string" || !email.includes("@")) {
        return NextResponse.json({ error: "Email inválido" }, { status: 400 });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
      }

      const existing = await prisma.order.findFirst({ where: { lowifyId: orderId } });
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
    } else if (eventType === "order_refunded") {
      const order = await prisma.order.findFirst({ where: { lowifyId: orderId } });
      if (order) {
        await prisma.order.update({ where: { id: order.id }, data: { status: "cancelled" } });
      }
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
