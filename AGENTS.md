<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Kiwify Webhook (pagamentos)

Endpoint: `/api/kiwify/webhook`
Eventos: `order_approved` (cria pedido), `order_refunded` (cancela pedido)
Chave de dedup: `order_id` → salvo em `Order.lowifyId`
Identifica usuário por: `Customer.email`
Payload real: https://github.com/renatoroquejani/integracoes-webhook/tree/master/payloads/kiwify
Webhook URL a configurar no dashboard Kiwify: https://cura-emocional.vercel.app/api/kiwify/webhook
Checkout URL: https://pay.kiwify.com.br/m8GJCM6
