import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const checkoutUrl = process.env.KIWIFY_CHECKOUT_URL;
  if (!checkoutUrl) {
    return NextResponse.json({ error: "Checkout não configurado" }, { status: 500 });
  }

  return NextResponse.redirect(checkoutUrl);
}