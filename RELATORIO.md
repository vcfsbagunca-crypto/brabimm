# RELATÓRIO COMPLETO — Cura Emocional

> **Gerado em:** 28/06/2026
> **Stack:** Next.js 16.2.9 (App Router) + React 19.2.4 + Prisma 7.8.0 (SQLite) + Tailwind v4 + Framer Motion
> **Auth:** NextAuth v5 beta (Credentials) + JWT (jose)
> **Pagamentos:** Lowify (gateway brasileiro)

---

## 1. ARQUITETURA GERAL

### 1.1 Estrutura de Diretórios

```
cura-emocional/
├── prisma/
│   ├── schema.prisma          ← Modelos do banco (User, Order, Module, ModuleProgress, JournalEntry)
│   ├── dev.db                 ← Banco SQLite em dev
│   ├── seed.mjs / seed.cjs    ← Scripts de seed
│   └── migrations/            ← Migrações Prisma
├── src/
│   ├── app/
│   │   ├── layout.tsx         ← Root layout (fonts, SessionProvider, Toaster)
│   │   ├── page.tsx           ← Landing page (hero, módulos, CTA)
│   │   ├── globals.css        ← Tailwind v4 + animações customizadas
│   │   ├── (auth)/
│   │   │   ├── layout.tsx     ← Layout vazio para páginas de auth
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── page.tsx         ← Dashboard principal (progresso + módulos)
│   │   │       ├── journal/page.tsx ← Diário emocional
│   │   │       └── modules/[id]/page.tsx ← Página de cada módulo
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx     ← Layout vazio
│   │   │   └── pricing/page.tsx ← Página de preço (R$ 29,99)
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts  ← NextAuth handler
│   │       │   ├── login/route.ts          ← Login custom (JWT direto)
│   │       │   ├── register/route.ts       ← Cadastro
│   │       │   ├── me/route.ts             ← Sessão atual
│   │       │   └── access/route.ts         ← Verifica acesso pago
│   │       ├── checkout/route.ts           ← Gera pedido + redireciona Lowify
│   │       ├── journal/route.ts            ← CRUD diário
│   │       ├── lowify/webhook/route.ts     ← Webhook de pagamento
│   │       ├── modules/[id]/progress/route.ts ← Toggle conclusão
│   │       ├── progress/route.ts           ← Progresso do usuário
│   │       └── seed/route.ts               ← Popula módulos no banco
│   ├── components/
│   │   ├── Header.tsx         ← Navbar (user menu, links)
│   │   ├── SessionProvider.tsx ← Wrapper NextAuth
│   │   ├── ModuleContent.tsx  ← Renderiza módulo + exercício
│   │   └── JournalForm.tsx    ← Formulário do diário
│   ├── lib/
│   │   ├── auth.ts            ← Config NextAuth v5
│   │   ├── prisma.ts          ← Singleton PrismaClient
│   │   └── modules-data.ts    ← CONTEÚDO DOS 10 MÓDULOS
│   ├── generated/prisma/      ← Gerado pelo Prisma (auto)
│   └── proxy.ts               ← Função de middleware (NÃO IMPLANTADA)
├── .env                   ← Variáveis de ambiente
├── AGENTS.md              ← Regras para IA
├── package.json           ← Dependências
├── tsconfig.json          ← TypeScript config
└── next.config.ts         ← Next.js config (vazio)
```

### 1.2 Rotas do App

| Rota | Arquivo | Tipo | Descrição |
|------|---------|------|-----------|
| `/` | `page.tsx` | Client | Landing page com hero, typewriter, cards dos 10 módulos |
| `/login` | `(auth)/login/page.tsx` | Client | Formulário de login |
| `/register` | `(auth)/register/page.tsx` | Client | Formulário de cadastro |
| `/pricing` | `(marketing)/pricing/page.tsx` | Client | Página de preço com depoimentos |
| `/dashboard` | `(dashboard)/dashboard/page.tsx` | Client | Dashboard com progresso + lista de módulos |
| `/dashboard/journal` | `(dashboard)/dashboard/journal/page.tsx` | Server | Diário emocional com histórico |
| `/dashboard/modules/[id]` | `(dashboard)/dashboard/modules/[id]/page.tsx` | Server | Conteúdo do módulo + exercício |

### 1.3 API Routes

| Rota | Métodos | Descrição |
|------|---------|-----------|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth handler |
| `/api/auth/register` | POST | Cria usuário (bcrypt, 12 rounds) |
| `/api/auth/login` | POST | Login custom (retorna JWT + seta cookie) |
| `/api/auth/me` | GET | Retorna sessão atual |
| `/api/auth/access` | GET | `{ hasAccess: boolean }` |
| `/api/checkout` | GET | Cria pedido + redirect Lowify |
| `/api/lowify/webhook` | POST | Atualiza status do pedido |
| `/api/progress` | GET | Progresso do usuário |
| `/api/modules/[id]/progress` | POST | Toggle conclusão |
| `/api/journal` | GET, POST | Lista/cria entradas do diário |
| `/api/seed` | GET | Popula tabela Module |

### 1.4 Modelos do Banco (Prisma)

```
User
├── id, name, email (unique), password, image, emailVerified
├── createdAt, updatedAt
├── modules[] → ModuleProgress
├── journalEntries[] → JournalEntry
└── orders[] → Order

Order
├── id, userId, status (pending|paid|cancelled), lowifyId?
├── amount (Float), plan (default: "monthly")
├── createdAt, updatedAt
└── user → User

Module
├── id, order (unique), title, slug (unique), description, icon, content
├── createdAt
└── progresses[] → ModuleProgress

ModuleProgress
├── id, userId, moduleId, completed (Boolean)
├── createdAt, updatedAt
├── user → User, module → Module
└── @@unique([userId, moduleId])

JournalEntry
├── id, userId, content, mood?
├── createdAt, updatedAt
└── user → User
```

---

## 2. SISTEMA DE AUTENTICAÇÃO

### 2.1 Fluxo de Login

1. Usuário preenche email + senha em `/login`
2. `POST /api/auth/login`:
   - Busca user no DB por email
   - Compara senha com `bcryptjs.compare()`
   - Gera JWT com `jose` (encode do next-auth/jwt)
   - Seta cookie `authjs.session-token` (httpOnly, sameSite: lax, 30 dias)
   - Redireciona para `/dashboard`
3. NextAuth v5 configurado em `lib/auth.ts`:
   - **Provider:** Credentials (email + password)
   - **Estratégia:** JWT
   - **Callback session:** anexa `user.id` ao token
   - **Sign-in page:** `/login`

### 2.2 Fluxo de Cadastro

1. `POST /api/auth/register`:
   - Valida campos obrigatórios
   - Verifica email duplicado
   - Hash com `bcryptjs.hash(password, 12)`
   - Cria User no banco
   - Redireciona para `/login?registered=true`

### 2.3 Cookie

- Nome: `authjs.session-token`
- httpOnly: true (inacessível via JS)
- sameSite: lax
- secure: false (em dev)
- path: /
- maxAge: 30 dias
- Não há cookie `__Secure-` prefix (secure é false)

### 2.4 Middleware (proxy.ts — NÃO IMPLANTADO)

O arquivo `src/proxy.ts` contém uma função `proxy()` pronta que:
- Redireciona não-autenticados de `/dashboard/*` para `/login`
- Redireciona autenticados de `/login` e `/register` para `/dashboard`

**Status:** Exportado mas NÃO registrado como middleware Next.js (não há `middleware.ts`). A proteção das rotas é feita manualmente em cada página via `useSession` + `useEffect`.

---

## 3. SISTEMA DE PAGAMENTO (Lowify)

### 3.1 Fluxo Completo

1. Usuário clica "Comprar" em `/pricing`
2. Redirecionado para `GET /api/checkout`
3. Backend:
   - Cria `Order` com `status: "pending"`, `amount: 29.99`, `plan: "lifetime"`
   - Monta URL do Lowify com:
     - `external_reference` = order.id
     - `customer_email` = email do usuário
     - `customer_name` = nome do usuário
     - `notification_url` = `${AUTH_URL}/api/lowify/webhook`
   - Redireciona para Lowify
4. Usuário paga no ambiente Lowify
5. Lowify envia webhook `POST /api/lowify/webhook`:
   - Status `approved|completed|paid` → Order → `status: "paid"`
   - Status `refunded|cancelled|rejected` → Order → `status: "cancelled"`
6. Dashboard consulta `GET /api/auth/access`:
   - Se `hasAccess: true` → conteúdo liberado
   - Se `hasAccess: false` → overlay de bloqueio (blur + CTA)

### 3.2 Variáveis de Ambiente

```
LOWIFY_CHECKOUT_URL=https://pay.lowify.com.br/checkout?product_id=Jz6grx
LOWIFY_WEBHOOK_SECRET=          ← VAZIO (webhook não validado)
```

### 3.3 Segurança do Webhook

**⚠️ ATENÇÃO:** O webhook não valida assinatura/secret atualmente. Qualquer requisição POST para `/api/lowify/webhook` pode alterar status de pedidos. É necessário implementar validação usando `LOWIFY_WEBHOOK_SECRET`.

---

## 4. CONTEÚDO DOS MÓDULOS

### 4.1 Fonte dos Dados

- **Fonte primária:** `src/lib/modules-data.ts` (316 linhas)
- **Banco de dados:** Tabela `Module` populada via `GET /api/seed`
- **UI usa o arquivo TS diretamente**, não o banco
- O banco é usado apenas para `ModuleProgress` (controle de conclusão)

### 4.2 Estrutura de Cada Módulo

```typescript
interface ModuleContent {
  id: string;          // "mod-1", "mod-2", ...
  order: number;       // 1 a 10
  title: string;
  slug: string;        // usado na URL
  description: string; // resumo
  icon: string;        // emoji
  sections: { heading: string; text: string }[];  // conteúdo educativo
  exercise: { title: string; prompt: string };     // exercício prático
}
```

### 4.3 Lista dos 10 Módulos

| # | ID | Título | Slug | Ícone |
|---|-----|--------|------|-------|
| 1 | mod-1 | Entendendo o Trauma | entendendo-o-trauma | 🧠 |
| 2 | mod-2 | Identificando Gatilhos | identificando-gatilhos | 🔍 |
| 3 | mod-3 | Respiração e Relaxamento | respiracao-e-relaxamento | 🌬️ |
| 4 | mod-4 | Escrita Terapêutica | escrita-terapeutica | ✍️ |
| 5 | mod-5 | Higiene do Sono | higiene-do-sono | 🌙 |
| 6 | mod-6 | Movimento e Humor | movimento-e-humor | 🏃 |
| 7 | mod-7 | Rede de Apoio | rede-de-apoio | 🤝 |
| 8 | mod-8 | Limites Saudáveis | limites-saudaveis | 🛡️ |
| 9 | mod-9 | Mindfulness Prático | mindfulness-pratico | 🧘 |
| 10 | mod-10 | Ajuda Profissional | ajuda-profissional | 🏥 |

---

## 5. DIÁRIO EMOCIONAL

### 5.1 Funcionalidades

- **Criar entrada:** Formulário com textarea + seletor de humor (6 opções)
- **Listar entradas:** Server component, busca últimas 50 entradas
- **Entradas de exercício:** Prefixadas com `## Exercício: <title>` e exibidas com badge verde
- **Moods disponíveis:** 😊 Feliz, 😌 Calmo, 😐 Neutro, 😢 Triste, 😰 Ansioso, 😤 Irritado

### 5.2 API

- `GET /api/journal` → últimas 50 entries do usuário autenticado
- `POST /api/journal` → cria entry (body: `{ content, mood? }`)

---

## 6. DASHBOARD

### 6.1 Componentes

- **ProgressRing:** SVG circular animado com gradiente
- **Barra de progresso:** Gradiente horizontal animado
- **Lista de módulos:** Cards com cor, ícone, status (concluído/pendente)
- **Saudação:** Bom dia/Boa tarde/Boa noite baseado no horário
- **Confetti:** Quando 100% dos módulos concluídos

### 6.2 Controle de Acesso

- Usuário sem `hasAccess` vê o dashboard com **blur + overlay**
- Overlay mostra CTA "Quero Desbloquear Agora" → `/pricing`
- Usuário com acesso → dashboard completo

---

## 7. COMPONENTES REUTILIZÁVEIS

| Componente | Props | Descrição |
|-----------|-------|-----------|
| `Header` | — | Navbar com logo, links, user menu dropdown |
| `SessionProvider` | `children, session?` | Wrapper NextAuth SessionProvider |
| `ModuleContent` | `mod, userId, isCompleted` | Renderiza módulo completo + exercício |
| `JournalForm` | — | Formulário de entrada no diário |

---

## 8. ESTILOS E ANIMAÇÕES

### 8.1 Tailwind v4

- Tema custom: `healing-*` (teal/emerald), `calm-*` (purple)
- Glass effect: `.glass`, `.glass-strong`
- Card animations: `.card-hover`, `.card-glow`

### 8.2 Animações CSS (`globals.css`)

| Animação | Descrição |
|----------|-----------|
| `float` | Levitação suave (Y) |
| `float-slow` | Flutuação com rotação |
| `pulse-glow` | Pulsar de opacidade |
| `gradient-shift` | Movimento de gradiente |
| `shimmer` | Brilho deslizante |
| `fade-in-up` | Fade + slide up |
| `scale-in` | Escala de 0.9 → 1 |
| `blob` | Movimento orgânico para blur backgrounds |

### 8.3 Framer Motion

- Stagger children em listas
- Spring animations
- AnimatePresence para transições de entrada/saída
- Typewriter effect no hero
- Scroll-based animations (useScroll, useTransform)

---

## 9. VARIÁVEIS DE AMBIENTE

```env
DATABASE_URL="file:./prisma/dev.db"     # SQLite
AUTH_SECRET="..."                        # JWT signing secret
AUTH_URL="http://localhost:3000"         # Base URL
LOWIFY_CHECKOUT_URL="https://pay..."    # URL do Lowify
LOWIFY_WEBHOOK_SECRET=""                # ⚠️ VAZIO - precisa configurar
```

---

## 10. DEPENDÊNCIAS

### Produção
| Pacote | Versão | Uso |
|--------|--------|-----|
| next | 16.2.9 | Framework |
| react / react-dom | 19.2.4 | UI |
| next-auth | 5.0.0-beta.31 | Autenticação |
| @prisma/client | 7.8.0 | ORM |
| @prisma/adapter-libsql | 7.8.0 | Adaptador libSQL |
| @libsql/client | 0.17.4 | Driver SQLite/libSQL |
| bcryptjs | 3.0.3 | Hash de senha |
| jose | 6.2.3 | JWT |
| framer-motion | 12.42.0 | Animações |
| react-hot-toast | 2.6.0 | Toast notifications |

### Dev
| Pacote | Versão |
|--------|--------|
| prisma | 7.8.0 |
| tailwindcss | 4 |
| @tailwindcss/postcss | 4 |
| typescript | 5 |
| eslint | 9 |
| eslint-config-next | 16.2.9 |
| @types/node / @types/react / @types/react-dom / @types/bcryptjs | — |

---

## 11. NPM SCRIPTS

| Script | Comando |
|--------|---------|
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `eslint` |

---

## 12. MELHORIAS PENDENTES / PONTOS DE ATENÇÃO

### 🔴 Críticos
1. **Webhook sem validação** — `LOWIFY_WEBHOOK_SECRET` vazio. Implementar validação de assinatura.
2. **Middleware não implantado** — `proxy.ts` existe mas não é usado. Roteamento não protegido server-side.
3. **Segurança JWT** — `AUTH_SECRET` é um placeholder (`dev-secret-do-not-use-in-production-change-it`). Trocar em produção.
4. **Senha: tamanho mínimo 6** — Considerar aumentar para 8+ em produção.
5. **Sem rate limiting** — Endpoints de login/register sem proteção contra brute force.

### 🟡 Importantes
6. **Preço no DB pode ser inconsistente** — Pedidos antigos têm `amount: 97` (Int convertido para Float), novos terão `29.99`.
7. **Sem recuperação de senha** — Não há fluxo de "esqueci minha senha".
8. **Conteúdo hardcoded** — Módulos estão em `modules-data.ts`. Para CMS seria necessário migrar para banco.
9. **Sem analytics** — Nenhum tracking de uso ou conversão.
10. **Diário sem edição/exclusão** — Usuário não pode editar ou apagar entradas.

### 🟢 Sugestões
11. **PWA** — Poderia adicionar manifest.json e service worker para instalação.
12. **Modo escuro** — Não implementado.
13. **Offline first** — Conteúdo poderia ser cacheado para acesso offline.
14. **Acessibilidade** — Revisar labels, aria, foco, contraste.
15. **Testes** — Nenhum teste unitário ou E2E.
16. **CI/CD** — Sem pipeline configurada.
17. **i18n** — Conteúdo apenas em português.
18. **SEO** — Meta tags básicas, sem Open Graph enriquecido.
19. **Performance** — Imagens sem otimização (next/image não usado).
20. **CRP (Conselho Regional)** — Links para encontrar psicólogos podem precisar de validação legal.

---

## 13. FLUXOS COMPLETOS DO USUÁRIO

### Fluxo: Novo Usuário Gratuito
1. Acessa `/` → landing page
2. Clica "Começar Gratuitamente" → `/register`
3. Preenche nome, email, senha → `POST /api/auth/register`
4. Redirecionado para `/login?registered=true`
5. Faz login → `POST /api/auth/login` → cookie setado
6. Redirecionado para `/dashboard`
7. Vê overlay de bloqueio (blur) pois não pagou
8. Clica "Quero Desbloquear Agora" → `/pricing`
9. Vê oferta de R$ 29,99 com depoimentos e garantia

### Fluxo: Usuário Pagante
1-6. Mesmo que acima
7. Tem `hasAccess: true` → dashboard completo
8. Vê progresso, módulos, pode acessar cada módulo
9. Dentro do módulo: lê seções, faz exercício, marca como concluído
10. Exercícios salvos no diário emocional
11. Progresso refletido no dashboard em tempo real

### Fluxo: Pagamento
1. Usuário clica "Comprar Agora" em `/pricing`
2. `GET /api/checkout` → cria Order (pending) → redirect Lowify
3. Usuário paga no Lowify
4. Lowify envia webhook → Order → `status: "paid"`
5. Usuário volta ao dashboard → acesso liberado

---

## 14. ARQUIVOS COMPLETOS — MAPA DE LINHAS

| Arquivo | Linhas | Propósito |
|---------|--------|-----------|
| `src/app/page.tsx` | 346 | Landing page |
| `src/app/layout.tsx` | 56 | Root layout |
| `src/app/globals.css` | 194 | Estilos globais + animações |
| `src/app/(auth)/login/page.tsx` | 151 | Login |
| `src/app/(auth)/register/page.tsx` | 157 | Cadastro |
| `src/app/(marketing)/pricing/page.tsx` | 235 | Preço |
| `src/app/(dashboard)/dashboard/page.tsx` | 360 | Dashboard |
| `src/app/(dashboard)/dashboard/journal/page.tsx` | 104 | Diário |
| `src/app/(dashboard)/dashboard/modules/[id]/page.tsx` | 37 | Módulo |
| `src/components/Header.tsx` | 138 | Navbar |
| `src/components/SessionProvider.tsx` | 17 | Auth wrapper |
| `src/components/ModuleContent.tsx` | 272 | Conteúdo do módulo |
| `src/components/JournalForm.tsx` | 120 | Formulário diário |
| `src/lib/auth.ts` | 46 | Config NextAuth |
| `src/lib/prisma.ts` | 14 | Prisma singleton |
| `src/lib/modules-data.ts` | 316 | CONTEÚDO DOS 10 MÓDULOS |
| `src/proxy.ts` | 27 | Middleware (não usado) |
| `prisma/schema.prisma` | 72 | Schema do banco |
| `src/app/api/auth/login/route.ts` | 84 | Login API |
| `src/app/api/auth/register/route.ts` | 75 | Registro API |
| `src/app/api/auth/me/route.ts` | 6 | Sessão API |
| `src/app/api/auth/access/route.ts` | 16 | Acesso API |
| `src/app/api/checkout/route.ts` | 35 | Checkout API |
| `src/app/api/lowify/webhook/route.ts` | 36 | Webhook API |
| `src/app/api/journal/route.ts` | 37 | Journal API |
| `src/app/api/progress/route.ts` | 16 | Progresso API |
| `src/app/api/modules/[id]/progress/route.ts` | 33 | Toggle progresso |
| `src/app/api/seed/route.ts` | 34 | Seed API |

---

## 15. CONSIDERAÇÕES DE PRODUÇÃO

### Deploy
- Build: `npm run build` → pasta `.next`
- Start: `npm run start`
- Variáveis de ambiente DEVEM ser atualizadas:
  - `AUTH_SECRET` → gerar string aleatória forte
  - `AUTH_URL` → URL do deploy
  - `LOWIFY_WEBHOOK_SECRET` → configurar no Lowify
- Banco: SQLite (`dev.db`) não é adequado para produção multi-instância. Migrar para PostgreSQL/Turso.

### Segurança
- Trocar `AUTH_SECRET` imediatamente
- Implementar validação do webhook
- Rate limiting nos endpoints de auth
- Senha mínima de 8 caracteres
- Considerar 2FA

---

*Fim do Relatório — 28/06/2026*
