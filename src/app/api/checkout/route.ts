import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const checkoutUrl = process.env.LOWIFY_CHECKOUT_URL;
  if (!checkoutUrl) {
    return NextResponse.json({ error: "Checkout não configurado" }, { status: 500 });
  }

  const url = new URL(checkoutUrl);
  url.searchParams.set("customer_email", session.user.email || "");
  url.searchParams.set("customer_name", session.user.name || "");

  const host = req.headers.get("host") || "localhost:3000";
  const baseUrl = process.env.AUTH_URL || `http://${host}`;
  url.searchParams.set("notification_url", `${baseUrl}/api/lowify/webhook`);

  return NextResponse.redirect(url.toString());
}