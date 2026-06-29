import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const envs = {
    AUTH_SECRET_SET: !!process.env.AUTH_SECRET,
    AUTH_SECRET_LENGTH: process.env.AUTH_SECRET?.length,
    AUTH_URL: process.env.AUTH_URL,
    DATABASE_URL_SET: !!process.env.DATABASE_URL,
    DATABASE_URL_PREFIX: process.env.DATABASE_URL?.split("://")[0],
    TURSO_AUTH_TOKEN_SET: !!process.env.TURSO_AUTH_TOKEN,
    TURSO_AUTH_TOKEN_LENGTH: process.env.TURSO_AUTH_TOKEN?.length,
    NODE_ENV: process.env.NODE_ENV,
  };

  let authResult: any = null;
  let authError: string | null = null;
  try {
    const session = await auth();
    authResult = { hasSession: !!session, userId: session?.user?.id };
  } catch (e: any) {
    authError = e?.message || e?.toString() || "auth() threw";
  }

  let dbOk = false;
  let dbError: string | null = null;
  try {
    const count = await prisma.user.count();
    dbOk = true;
  } catch (e: any) {
    dbError = e?.message || e?.toString() || "db error";
  }

  return NextResponse.json({ envs, authResult, authError, dbOk, dbError });
}
