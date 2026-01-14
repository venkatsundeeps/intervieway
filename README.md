# Intervieway — AI Website + Chatbot Setup (One-Time)

Intervieway builds a clear website and AI chatbot for non-technical small/medium business owners. We set everything up once, hand it over, and you keep the keys.

## What this site does
- Explains the service in simple language.
- Shows a live floating chatbot that auto-opens, asks up to 5 guided questions, and collects contact details.
- Emails lead details (name, email, optional phone) after the chat flow (mock hook ready to wire to your email service).

## What clients own
- Website and domain
- Hosting provider account
- AI API key (OpenAI or Gemini)
- Data from chats and leads

## How the chatbot works
- Personality: friendly, professional, short replies, no jargon.
- Flow: up to 5 questions, one at a time → then ask for name + email (+ optional phone) → confirm a summary will be emailed.
- Providers: switch between OpenAI and Gemini via environment variables. Keys are never hardcoded.

## Handover
- One-time setup with clear documentation.
- We connect your AI key, hosting, and email delivery, then hand over credentials.
- No vendor lock-in or hidden recurring charges.

## Tech stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Ready for Vercel deployment

## Getting started (non-technical friendly)
1) Install Node.js 18+.
2) Run `npm install`.
3) Copy `.env.example` to `.env.local` and fill in:
   - `AI_PROVIDER` = `openai` or `gemini`
   - `OPENAI_API_KEY` or `GEMINI_API_KEY`
   - Optional: `OPENAI_MODEL` or `GEMINI_MODEL`
   - Optional: `LEAD_WEBHOOK_URL` pointing to a Google Sheets / Apps Script endpoint that accepts JSON
4) Start locally: `npm run dev` then open http://localhost:3000.

## Deploying to Vercel
- Create a new Vercel project and link this repo.
- Add the same environment variables in Vercel Project Settings → Environment Variables.
- Deploy. No extra build steps are needed (`npm run build` is automatic).

## Key files
- `app/page.tsx` — homepage sections.
- `app/api/chat/route.ts` — chatbot API endpoint.
- `app/api/leads/route.ts` — saves leads and can forward them to Google Sheets via webhook.
- `components/ChatWidget.tsx` — floating widget UI.
- `lib/prompt.ts` — chatbot system prompt.
- `lib/ai.ts` — OpenAI/Gemini switch and request handling.

## Simple automation flow
1) Visitor chats in the floating widget (auto-opens after a few seconds).
2) Bot asks up to 5 questions, then collects contact details.
3) Details are saved and emailed to the business owner (mock in this starter; add your email service if desired).

## Support
If you need help filling env vars or deploying, share your `.env.local` values (except the actual keys) and we’ll guide you step-by-step.
# intervieway
