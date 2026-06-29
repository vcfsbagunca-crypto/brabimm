"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const depoimentos = [
  {
    nome: "Ana Clara",
    texto: "Esse curso mudou minha forma de lidar com a ansiedade. Em 3 semanas já senti diferença.",
    idade: "34 anos",
  },
  {
    nome: "Carlos Eduardo",
    texto: "Finalmente entendi de onde vinham meus padrões emocionais. Material transformador.",
    idade: "41 anos",
  },
  {
    nome: "Juliana Costa",
    texto: "O diário emocional e os exercícios práticos viraram meu momento favorito do dia.",
    idade: "28 anos",
  },
];

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeDepo, setActiveDepo] = useState(0);

  async function handleCheckout() {
    if (!session) {
      router.push("/login?callbackUrl=/pricing");
      return;
    }
    router.push("/api/checkout");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-80 h-80 rounded-full bg-emerald-200/25 mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-teal-200/25 mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-purple-200/15 mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative w-full max-w-lg animate-fade-in-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6">
            <img src="/logo.png" alt="Cura Emocional" className="h-8 w-auto" />
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Cura Emocional</span>
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Invista na Sua Saúde Emocional</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Acesso completo e vitalício a todos os 10 módulos da Jornada de Cura Emocional
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-center">
            <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">
              Oferta por tempo limitado
            </span>
          </div>

          <div className="p-8">
            <div className="text-center mb-6">
              <p className="text-sm text-zinc-400 dark:text-zinc-600 line-through mb-1">
                De R$ 79,90
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">R$</span>
                <span className="text-6xl font-bold text-zinc-900 dark:text-zinc-100">24,99</span>
              </div>
              <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">pagamento único — acesso vitalício</p>
            </div>

            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 px-4 py-3 mb-6 text-center">
              <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                Menos de R$ 2,50 por módulo
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              {[
                "10 módulos completos sobre cura emocional",
                "Exercícios práticos e diário pessoal",
                "Acompanhamento do seu progresso",
                "Acesso vitalício + atualizações futuras",
                "Suporte por email",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <svg className="h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900 px-4 py-3 mb-6 text-center">
              <p className="text-xs text-amber-700 dark:text-amber-300">
                <span className="font-semibold">Garantia de 7 dias:</span> se não gostar, devolvemos seu dinheiro sem burocracia.
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300"
            >
              {session ? "Quero Começar Agora" : "Fazer Login e Garantir o Meu"}
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <p className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
              Pagamento 100% seguro via Lowify
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-lg p-6 text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">4.9</span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 ml-1">(120+ alunos)</span>
          </div>

          <blockquote className="text-sm text-zinc-600 dark:text-zinc-400 italic leading-relaxed">
            &ldquo;{depoimentos[activeDepo].texto}&rdquo;
          </blockquote>
          <p className="mt-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {depoimentos[activeDepo].nome}, {depoimentos[activeDepo].idade}
          </p>

          <div className="flex items-center justify-center gap-2 mt-4">
            {depoimentos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveDepo(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === activeDepo ? "bg-emerald-500 w-5" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}