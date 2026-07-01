import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { validateCsrf } from "@/lib/csrf";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MIN_PASSWORD = 8;
const MAX_PASSWORD = 128;

export async function POST(req: NextRequest) {
  try {
    if (!validateCsrf(req)) {
      return NextResponse.json({ message: "Requisição inválida" }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rate = checkRateLimit(`register:${ip}`, { windowMs: 60_000, maxRequests: 5 });
    if (!rate.allowed) {
      return NextResponse.json(
        { message: "Muitas tentativas. Tente novamente em 1 minuto." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rate.resetAt - Date.now()) / 1000)) } }
      );
    }
    const ct = req.headers.get("content-type") || "";
    const isForm = ct.includes("application/x-www-form-urlencoded");

    let name: string | null = null;
    let email = "";
    let password = "";

    if (isForm) {
      const form = await req.formData();
      name = (form.get("name") as string)?.trim() || null;
      email = (form.get("email") as string)?.trim() || "";
      password = form.get("password") as string;
    } else {
      const body = await req.json();
      name = body.name ? String(body.name).trim().slice(0, MAX_NAME) : null;
      email = String(body.email || "").trim().toLowerCase().slice(0, MAX_EMAIL);
      password = String(body.password || "");
    }

    if (!email || !password) {
      const msg = "Email e senha são obrigatórios";
      if (isForm) {
        return new Response(null, { status: 302, headers: { Location: `/register?error=${encodeURIComponent(msg)}` } });
      }
      return NextResponse.json({ message: msg }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      const msg = "Email inválido";
      if (isForm) {
        return new Response(null, { status: 302, headers: { Location: `/register?error=${encodeURIComponent(msg)}` } });
      }
      return NextResponse.json({ message: msg }, { status: 400 });
    }

    if (password.length < MIN_PASSWORD || password.length > MAX_PASSWORD) {
      const msg = `Senha deve ter entre ${MIN_PASSWORD} e ${MAX_PASSWORD} caracteres`;
      if (isForm) {
        return new Response(null, { status: 302, headers: { Location: `/register?error=${encodeURIComponent(msg)}` } });
      }
      return NextResponse.json({ message: msg }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      const msg = "Este email já está cadastrado";
      if (isForm) {
        return new Response(null, { status: 302, headers: { Location: `/register?error=${encodeURIComponent(msg)}` } });
      }
      return NextResponse.json({ message: msg }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
      },
    });

    if (isForm) {
      return new Response(null, { status: 302, headers: { Location: "/login?registered=true" } });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
