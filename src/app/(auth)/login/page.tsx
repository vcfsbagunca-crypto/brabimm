"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const ERROR_MESSAGES: Record<string, string> = {
  CredentialsSignin: "Email ou senha incorretos. Verifique e tente novamente.",
  MissingCSRF: "Sessão expirada. Recarregue a página e tente novamente.",
  AccessDenied: "Acesso negado.",
  Configuration: "Erro de configuração. Tente novamente mais tarde.",
  Verification: "Link de verificação expirado ou já utilizado.",
};

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "true") setRegistered(true);
    const err = params.get("error");
    if (err) {
      setError(ERROR_MESSAGES[err] || "Erro ao fazer login. Tente novamente.");
      window.history.replaceState({}, "", "/login");
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        window.location.href = "/dashboard";
      } else {
        const errKey = res?.error || "";
        setError(ERROR_MESSAGES[errKey] || "Email ou senha incorretos. Verifique e tente novamente.");
      }
    } catch {
      setError("Erro de conexão. Verifique sua internet.");
    }
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-emerald-200/30 mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-teal-200/30 mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-200/20 mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 shadow-xl shadow-black/5 dark:shadow-black/20 p-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <img src="/logo.png" alt="Cura Emocional" className="h-10 w-auto mx-auto mb-6" />
            </Link>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Bem-vindo de volta</h1>
            <p className="mt-1.5 text-zinc-500 dark:text-zinc-400">
              Acesse sua jornada de cura emocional
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            {registered && (
              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 p-3.5 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Conta criada com sucesso! Faça login.
              </div>
            )}
            {error && (
              <div className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900 p-3.5 text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
                <svg className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {error}
                  <br />
                  <Link href="/register" className="font-semibold underline hover:text-red-500">
                    Criar conta gratuita
                  </Link>{" "}
                  se ainda não tem acesso.
                </span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900 transition-all"
                placeholder="voce@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900 transition-all"
                placeholder="Sua senha"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Não tem conta?{" "}
              <Link href="/register" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}