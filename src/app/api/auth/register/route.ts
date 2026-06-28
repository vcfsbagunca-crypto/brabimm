import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get("content-type") || "";
    const isForm = ct.includes("application/x-www-form-urlencoded");

    let name: string | null = null;
    let email = "";
    let password = "";

    if (isForm) {
      const form = await req.formData();
      name = (form.get("name") as string) || null;
      email = form.get("email") as string;
      password = form.get("password") as string;
    } else {
      const body = await req.json();
      name = body.name || null;
      email = body.email;
      password = body.password;
    }

    if (!email || !password) {
      const body = isForm
        ? new URLSearchParams({ error: "Email e senha são obrigatórios" })
        : null;
      return isForm
        ? new Response(null, {
            status: 302,
            headers: { Location: `/register?${body?.toString()}` },
          })
        : NextResponse.json(
            { message: "Email e senha são obrigatórios" },
            { status: 400 }
          );
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      if (isForm) {
        return new Response(null, {
          status: 302,
          headers: { Location: `/register?error=Este+email+já+está+cadastrado` },
        });
      }
      return NextResponse.json(
        { message: "Este email já está cadastrado" },
        { status: 400 }
      );
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
      return new Response(null, {
        status: 302,
        headers: { Location: `/login?registered=true` },
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
