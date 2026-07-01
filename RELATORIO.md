# RELATÓRIO COMPLETO — Cura Emocional

> **Gerado em:** 29/06/2026
> **Stack:** Next.js 16.2.9 (App Router) + React 19.2.4 + Prisma 7.8.0 (Turso/libSQL) + Tailwind v4 + Framer Motion
> **Auth:** NextAuth v5 beta (Credentials) + JWT
> **Pagamentos:** Kiwify

---

## 1. ARQUITETURA GERAL

### 1.1 Estrutura de Diretórios

```
cura-emocional/
├── prisma/
│   ├── schema.prisma          ← Modelos do banco (User, Order, Module, ModuleProgress, JournalEntry)
│   ├── migrations/            ← Migração inicial (antes do Order)
│   └── seed.mjs / seed.cjs    ← Scripts de seed locais
├── public/
│   ├── logo.png               ← Logo da marca (200×200, ~20 KB)
│   └── ... (SVGs padrão Next.js)
├── src/
│   ├── app/
│   │   ├── layout.tsx         ← Root layout (fonts, SessionProvider, Toaster)
│   │   ├── page.tsx           ← Landing page (hero, módulos, CTA, footer)
│   │   ├── globals.css        ← Tailwind v4 + animações
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx      ← Login com signIn("credentials")
│   │   │   └── register/page.tsx   ← Cadastro
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── page.tsx         ← Dashboard (progresso + módulos)
│   │   │       ├── journal/page.tsx ← Diário (server component, lock p/ não pagantes)
│   │   │       └── modules/[id]/page.tsx ← Conteúdo módulo
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   └── pricing/page.tsx     ← R$ 24,99 vitalício, depoimentos, Kiwify
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts  ← NextAuth handler
│   │       │   ├── register/route.ts       ← Cadastro (bcrypt, 12 rounds)
│   │       │   ├── me/route.ts             ← Sessão atual
│   │       │   └── access/route.ts         ← Verifica acesso pago
│   │       ├── checkout/route.ts           ← Redireciona para Kiwify
│   │       ├── journal/route.ts            ← CRUD diário (protegido)
│   │       ├── kiwify/webhook/route.ts     ← Webhook Kiwify (order_approved/order_refunded)
│   │       ├── lowify/webhook/route.ts     ← (não usado, mantido)
│   │       ├── modules/[id]/progress/route.ts ← Toggle conclusão
│   │       ├── progress/route.ts           ← GET/DELETE progresso
│   │       └── seed/route.ts               ← Popula módulos no banco
│   ├── components/
│   │   ├── Header.tsx         ← Navbar (logo, user menu, theme toggle)
│   │   ├── SessionProvider.tsx ← Wrapper NextAuth
│   │   ├── ModuleContent.tsx  ← Renderiza módulo + exercícios + progresso
│   │   ├── JournalForm.tsx    ← Formulário do diário
│   │   └── ThemeToggle.tsx    ← Dark/light mode
│   ├── lib/
│   │   ├── auth.ts            ← Config NextAuth v5 (Credentials provider, JWT)
│   │   ├── prisma.ts          ← Singleton PrismaClient + PrismaLibSql adapter
│   │   └── modules-data.ts    ← CONTEÚDO DOS 10 MÓDULOS (hardcoded)
│   ├── middleware.ts          ← Middleware de autenticação (protege /dashboard, redireciona login/register)
│   └── generated/prisma/      ← Gerado pelo Prisma
├── descricao-saas.md          ← Descrição do produto p/ Kiwify
├── email-descricao.html       ← Template email onboarding
├── prompt-pdf-brinde.md       ← Prompt Canva para ebook bônus
├── AGENTS.md                  ← Regras para IA
├── .env / .env.example        ← Variáveis de ambiente
└── package.json / tsconfig.json / next.config.ts
```

### 1.2 Rotas do App

| Rota | Arquivo | Tipo | Descrição |
|------|---------|------|-----------|
| `/` | `page.tsx` | Client | Landing page com hero, typewriter, 10 módulos |
| `/login` | `(auth)/login/page.tsx` | Client | Login via `signIn("credentials")` |
| `/register` | `(auth)/register/page.tsx` | Client | Cadastro |
| `/pricing` | `(marketing)/pricing/page.tsx` | Client | R$ 24,99 vitalício, depoimentos |
| `/dashboard` | `(dashboard)/dashboard/page.tsx` | Client | Dashboard com progresso + módulos (bloqueado se não pagou) |
| `/dashboard/journal` | `(dashboard)/dashboard/journal/page.tsx` | Server | Diário emocional (bloqueado se não pagou) |
| `/dashboard/modules/[id]` | `(dashboard)/dashboard/modules/[id]/page.tsx` | Server | Conteúdo do módulo |

### 1.3 API Routes

| Rota | Métodos | Descrição |
|------|---------|-----------|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth handler |
| `/api/auth/register` | POST | Cria usuário (bcrypt, 12 rounds) |
| `/api/auth/me` | GET | Retorna sessão atual |
| `/api/auth/access` | GET | `{ hasAccess: boolean }` |
| `/api/checkout` | GET | Redireciona para `KIWIFY_CHECKOUT_URL` |
| `/api/kiwify/webhook` | POST | `order_approved` → cria pedido pago; `order_refunded` → cancela |
| `/api/lowify/webhook` | POST | Legacy (não usado) |
| `/api/progress` | GET, DELETE | Progresso do usuário |
| `/api/modules/[id]/progress` | POST | Toggle conclusão (upsert) |
| `/api/journal` | GET, POST | Lista/cria entradas (protegido) |
| `/api/seed` | GET | Popula tabela Module |

### 1.4 Modelos do Banco (Prisma — SQLite/Turso)

```
User
├── id (cuid), name, email (unique), password, image, emailVerified
├── createdAt, updatedAt
├── modules[] → ModuleProgress
├── journalEntries[] → JournalEntry
└── orders[] → Order

Order
├── id (cuid), userId, status (pending|paid|cancelled), lowifyId? (guarda order_id do Kiwify)
├── amount (Float), plan (lifetime)
├── createdAt, updatedAt
└── user → User (onDelete: Cascade)

Module
├── id (cuid), order (unique), title, slug (unique), description, icon, content
├── createdAt
└── progresses[] → ModuleProgress

ModuleProgress
├── id (cuid), userId, moduleId, completed (Boolean)
├── createdAt, updatedAt
├── user → User, module → Module
└── @@unique([userId, moduleId])

JournalEntry
├── id (cuid), userId, content, mood?
├── createdAt, updatedAt
└── user → User (onDelete: Cascade)
```

---

## 2. SISTEMA DE AUTENTICAÇÃO

### 2.1 Fluxo de Login

1. Usuário preenche email + senha em `/login`
2. `signIn("credentials", { email, password, redirect: false })`:
   - NextAuth faz `POST /api/auth/callback/credentials`
   - `authorize()` em `lib/auth.ts` busca user por email, compara senha com `bcryptjs.compare()`
   - Retorna `{ id, email, name, image }` → NextAuth gera JWT → seta cookie `authjs.session-token`
3. Em caso de sucesso: `window.location.href = "/dashboard"`
4. Em caso de erro: exibe mensagem "Email ou senha inválidos"

### 2.2 Fluxo de Cadastro

1. `POST /api/auth/register` (JSON ou form):
   - Aceita content-type JSON ou `application/x-www-form-urlencoded`
   - Valida campos obrigatórios, verifica email duplicado
   - Hash com `bcryptjs.hash(password, 12)`
   - Cria User no banco
   - Redireciona para `/login?registered=true`

### 2.3 Middleware (`src/middleware.ts`)

- Ativado para: `/dashboard/:path*`, `/login`, `/register`
- Usuário não autenticado → `/dashboard/*` redireciona para `/login?callbackUrl=...`
- Usuário autenticado → `/login` ou `/register` redireciona para `/dashboard`
- Lê cookie `authjs.session-token` ou `__Secure-authjs.session-token` (se HTTPS)

---

## 3. SISTEMA DE PAGAMENTO (Kiwify)

### 3.1 Fluxo Completo

1. Usuário clica "Quero Começar Agora" em `/pricing`
2. Se não logado: redireciona para `/login?callbackUrl=/pricing`
3. Logado: `GET /api/checkout` → **redireciona diretamente** para `KIWIFY_CHECKOUT_URL`
   - Não passa `customer_email`, `customer_name`, `notification_url` (Kiwify coleta na página)
4. Usuário paga na página da Kiwify
5. Kiwify envia webhook `POST /api/kiwify/webhook`:
   - **`order_approved`**: busca user por `Customer.email`, cria `Order { status: "paid", amount: 24.99, plan: "lifetime", lowifyId: order_id }`
   - **`order_refunded`**: busca `Order` por `lowifyId`, seta `status: "cancelled"`
   - Dedup por `order_id` (se já existir, retorna `{ received: true, alreadyProcessed: true }`)
6. Ao acessar `/dashboard` ou `/api/auth/access`: verifica se existe `Order { status: "paid" }` para o userId

### 3.2 Webhook Kiwify

**Endpoint:** `POST /api/kiwify/webhook`

Payload:
```json
// order_approved
{ "webhook_event_type": "order_approved", "order_id": "...", "order_status": "paid", "Customer": { "email": "..." } }
// order_refunded
{ "webhook_event_type": "order_refunded", "order_id": "...", "order_status": "refunded", "Customer": { "email": "..." } }
```

Referência: https://github.com/renatoroquejani/integracoes-webhook/tree/master/payloads/kiwify

### 3.3 Variáveis de Ambiente

```
DATABASE_URL=libsql://brabimm-vcfsbagunca-crypto.aws-us-east-1.turso.io
TURSO_AUTH_TOKEN=<token-jwt>
AUTH_SECRET=<base64-32>
AUTH_URL=https://cura-emocional.vercel.app
KIWIFY_CHECKOUT_URL=https://pay.kiwify.com.br/m8GJCM6
```

### 3.4 Segurança do Webhook

⚠️ O webhook não valida assinatura atualmente. A Kiwify envia `?signature=` como query param automaticamente quando configurado no dashboard. É recomendado validar o token `?signature=` ou usar um IP whitelist.

---

## 4. CONTEÚDO DOS MÓDULOS

### 4.1 Fonte dos Dados

- **Fonte primária:** `src/lib/modules-data.ts` (574 linhas)
- **Banco de dados:** Tabela `Module` populada via `GET /api/seed`
- **UI usa o arquivo TS diretamente** — o banco é usado apenas para `ModuleProgress`

### 4.2 Lista dos 10 Módulos

| # | ID | Slug | Título | Ícone |
|---|-----|------|--------|-------|
| 1 | mod-1 | entendendo-o-trauma | Entendendo o Trauma | 🧠 |
| 2 | mod-2 | identificando-gatilhos | Identificando Gatilhos | 🔍 |
| 3 | mod-3 | respiracao-e-relaxamento | Respiração e Relaxamento | 🌬️ |
| 4 | mod-4 | escrita-terapeutica | Escrita Terapêutica | ✍️ |
| 5 | mod-5 | higiene-do-sono | Higiene do Sono | 🌙 |
| 6 | mod-6 | movimento-e-humor | Movimento e Humor | 🏃 |
| 7 | mod-7 | rede-de-apoio | Rede de Apoio | 🤝 |
| 8 | mod-8 | limites-saudaveis | Limites Saudáveis | 🛡️ |
| 9 | mod-9 | mindfulness-pratico | Mindfulness Prático | 🧘 |
| 10 | mod-10 | ajuda-profissional | Ajuda Profissional | 🏥 |

---

## 5. DIÁRIO EMOCIONAL

### 5.1 Funcionalidades

- **Criar entrada:** Formulário com textarea + 6 humores (😊 Feliz, 😌 Calmo, 😐 Neutro, 😢 Triste, 😰 Ansioso, 😤 Irritado)
- **Listar entradas:** Server component, últimas 50 entradas
- **Entradas de exercício:** Prefixadas com `## Exercício:` e exibidas com badge verde
- **Bloqueio:** Se usuário não tem `Order { status: "paid" }`, exibe tela de "Acesso Exclusivo" com CTA para `/pricing`

### 5.2 Proteção

- **Server component:** `prisma.order.findFirst({ where: { userId, status: "paid" } })` → se null, renderiza tela bloqueada
- **API:** `POST/GET /api/journal` verifica acesso e retorna 403 se não pagante

---

## 6. DASHBOARD

### 6.1 Componentes

- **ProgressRing:** SVG circular animado com gradiente (teal → purple)
- **Barra de progresso:** Gradiente horizontal animado
- **Lista de módulos:** Cards com cores, ícone, status (concluído/pendente)
- **Saudação:** Bom dia/Boa tarde/Boa noite baseado no horário
- **Confetti:** Quando 100% dos módulos concluídos

### 6.2 Controle de Acesso

- Usuário sem `hasAccess` → dashboard com **blur + overlay + CTA "Quero Desbloquear Agora"**
- Overlay mostra `R$ 24,99` com botão para `/pricing`
- `GET /api/auth/access` → `{ hasAccess: !!order }`

---

## 7. COMPONENTES

| Componente | Arquivo | Descrição |
|-----------|---------|-----------|
| Header | `src/components/Header.tsx` | Navbar com logo, theme toggle, user menu dropdown, auth CTA |
| SessionProvider | `src/components/SessionProvider.tsx` | Wrapper NextAuth SessionProvider |
| ModuleContent | `src/components/ModuleContent.tsx` | Renderiza módulo, seções, exercícios, progresso, próximo módulo |
| JournalForm | `src/components/JournalForm.tsx` | Formulário de entrada no diário com seletor de humor |
| ThemeToggle | `src/components/ThemeToggle.tsx` | Alterna dark/light mode, persiste em localStorage |

---

## 8. ESTADO DO BANCO (29/06/2026)

### Turso — Database: `brabimm` (teste111 vazio)

| Tabela | Registros | Status |
|--------|-----------|--------|
| User | 1 | vcfspessoal@gmail.com (Vinicius) |
| Module | 10 | Seed populado |
| Order | 0 | Limpo |
| ModuleProgress | 0 | — |
| JournalEntry | 0 | — |

---

## 9. VARIÁVEIS DE AMBIENTE

### Produção (Vercel)

| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | `libsql://brabimm-vcfsbagunca-crypto.aws-us-east-1.turso.io` |
| `TURSO_AUTH_TOKEN` | JWT do Turso |
| `AUTH_SECRET` | `Bx5vhvP1z6CjV4tWYPiPTHweHszDAkVbUaeawlnjo2U=` (gerar novo em produção) |
| `AUTH_URL` | `https://cura-emocional.vercel.app` |
| `KIWIFY_CHECKOUT_URL` | `https://pay.kiwify.com.br/m8GJCM6` |

### Desenvolvimento (`.env`)

| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | `file:./prisma/dev.db` (SQLite local) |
| `AUTH_SECRET` | `dev-secret-do-not-use-in-production-change-it` |
| `AUTH_URL` | `http://localhost:3000` |
| `KIWIFY_CHECKOUT_URL` | `https://pay.kiwify.com.br/m8GJCM6` |

---

## 10. DEPENDÊNCIAS

### Produção
| Pacote | Versão | Uso |
|--------|--------|-----|
| next | 16.2.9 | Framework |
| react / react-dom | 19.2.4 | UI |
| next-auth | 5.0.0-beta.31 | Autenticação |
| @prisma/client | 7.8.0 | ORM |
| @prisma/adapter-libsql | 7.8.0 | Adaptador Turso |
| @libsql/client | 0.17.4 | Driver libSQL |
| bcryptjs | 3.0.3 | Hash de senha |
| jose | 6.2.3 | JWT |
| framer-motion | 12.42.0 | Animações |
| react-hot-toast | 2.6.0 | Notificações |

### Dev
| Pacote | Versão |
|--------|--------|
| prisma | 7.8.0 |
| tailwindcss | 4 |
| @tailwindcss/postcss | 4 |
| typescript | 5 |
| eslint | 9 |
| eslint-config-next | 16.2.9 |
| @types/bcryptjs, @types/node, @types/react, @types/react-dom | — |

---

## 11. NPM SCRIPTS

| Script | Comando |
|--------|---------|
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `eslint` |
| `postinstall` | `prisma generate` |

---

## 12. PONTOS DE ATENÇÃO / MELHORIAS

### 🔴 Críticos
1. ✅ **AUTH_SECRET e AUTH_URL** — configurados no Vercel e funcionando (diagnóstico: `auth()` OK, session OK).
2. **Webhook sem validação de assinatura** — Kiwify envia `?signature=` — considerar validar.
3. **Sem rate limiting** — endpoints de login/register expostos.

### 🟡 Importantes
4. **Migration sem Order** — migration inicial não inclui `Order`; se um dia precisar recriar o banco, vai faltar tabela.
5. **Sem recovery de senha** — nenhum fluxo de "esqueci minha senha".
6. **Conteúdo hardcoded** — módulos estão em `modules-data.ts`; qualquer alteração precisa de deploy.

### 🟢 Sugestões
7. **Testes** — nenhum teste unitário ou E2E.
8. **Edição/exclusão no diário** — usuário só pode criar, não editar ou apagar.
9. **Imagens sem next/image** — logo.png carregado com `<img>` sem otimização.
10. **SEO** — meta tags básicas, sem Open Graph enriquecido.

---

## 13. ARQUIVOS RELEVANTES — MAPA

| Arquivo | Propósito |
|---------|-----------|
| `src/lib/prisma.ts` | Singleton Prisma + PrismaLibSql adapter |
| `src/lib/auth.ts` | NextAuth v5 config (Credentials, JWT) |
| `src/middleware.ts` | Proteção de rotas |
| `src/app/api/kiwify/webhook/route.ts` | Webhook Kiwify |
| `src/app/api/checkout/route.ts` | Redireciona para Kiwify |
| `src/app/api/auth/access/route.ts` | Verifica acesso pago |
| `src/app/api/journal/route.ts` | CRUD diário (403 se não pagante) |
| `src/app/(dashboard)/dashboard/journal/page.tsx` | Server component diário (lock p/ não pagantes) |
| `src/app/(marketing)/pricing/page.tsx` | R$ 24,99 vitalício |
| `prisma/schema.prisma` | Schema do banco |
| `src/lib/modules-data.ts` | Conteúdo dos 10 módulos |
| `public/logo.png` | Logo da marca (200×200) |
| `public/logo-large.png` | Logo da marca (400×400) |
| `/home/dhskt/.opencode/DB_INFO` | Credenciais salvas |
| `CRIATIVOS.md` | Estratégia de marketing orgânico (hooks, formatos, legendas, calendário) |

---

## 14. HISTÓRICO DE MUDANÇAS

| Data | Mudança |
|------|---------|
| 28/06 | Migração Lowify → Kiwify (checkout + webhook) |
| 28/06 | Login corrigido: `signIn("credentials")` substitui custom JWT |
| 28/06 | PrismaLibSql adapter recebe `authToken` (corrige 500) |
| 28/06 | Logo PNG substitui heart SVG |
| 28/06 | Preço atualizado: R$ 79,90 → R$ 24,99 |
| 28/06 | Kiwify webhook configurado e testado |
| 29/06 | Banco limpo: 1 usuário real, 0 orders |
| 29/06 | Módulos seeded (10) |
| 29/06 | `proxy.ts` → `middleware.ts` (middleware ativado) |
| 29/06 | Texto "Lowify" → "Kiwify" no pricing |
| 29/06 | AUTH_SECRET gerado e configurado no Vercel |
| 29/06 | Bug AUTH_SECRET/AUTH_URL trocadas no Vercel — corrigido |
| 29/06 | Diagnóstico via `/api/diag` (removido após uso) |
| 29/06 | DB_INFO salvo em `/home/dhskt/.opencode/` |
| 29/06 | `CRIATIVOS.md` criado — estratégia orgânica completa (hooks, formatos, calendário, legendas) |
| 29/06 | Pesquisa de concorrência adicionada ao `CRIATIVOS.md` (benchmarks reais 2025-2026) |
| 01/07 | Logo escalada de 200×200 para 400×400 (logo-large.png) |

---

*Fim do Relatório — 29/06/2026*
