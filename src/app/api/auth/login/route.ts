import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { encode } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set("authjs.session-token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get("content-type") || "";
    const isForm = ct.includes("application/x-www-form-urlencoded");

    let email = "";
    let password = "";

    if (isForm) {
      const form = await req.formData();
      email = form.get("email") as string;
      password = form.get("password") as string;
    } else {
      const body = await req.json();
      email = body.email;
      password = body.password;
    }

    if (!email || !password) {
      if (isForm) {
        return NextResponse.redirect(new URL("/login?error=Dados+obrigat%C3%B3rios", req.url));
      }
      return NextResponse.json({ error: "Dados obrigatórios" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      if (isForm) {
        return NextResponse.redirect(new URL("/login?error=Email+ou+senha+inv%C3%A1lidos", req.url));
      }
      return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      if (isForm) {
        return NextResponse.redirect(new URL("/login?error=Email+ou+senha+inv%C3%A1lidos", req.url));
      }
      return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 });
    }

    const token = await encode({
      token: {
        sub: user.id,
        email: user.email,
        name: user.name,
        picture: user.image,
      },
      secret: process.env.AUTH_SECRET!,
      salt: "authjs.session-token",
      maxAge: 30 * 24 * 60 * 60,
    });

    if (isForm) {
      const response = NextResponse.redirect(new URL("/dashboard", req.url));
      setSessionCookie(response, token);
      return response;
    }

    const response = NextResponse.json({ redirectTo: "/dashboard" });
    setSessionCookie(response, token);
    return response;
  } catch {
    if (req.headers.get("content-type")?.includes("application/x-www-form-urlencoded")) {
      return NextResponse.redirect(new URL("/login?error=Erro+interno", req.url));
    }
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}