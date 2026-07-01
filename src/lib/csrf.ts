import { NextRequest } from "next/server";

const ALLOWED_ORIGINS = [
  "https://cura-emocional.vercel.app",
  "http://localhost:3000",
];

export function validateCsrf(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  if (origin) {
    return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
  }

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      return ALLOWED_ORIGINS.some(
        (allowed) => refererUrl.origin === allowed
      );
    } catch {
      return false;
    }
  }

  return false;
}
