# PickAIChat MVP — Payments + Provisioning Plan

Status: PLAN (not executed). Date: 2026-08-01.

## Context
The chat product works (free/paid mirror, two-layer remembrance, per-client routing,
admin bot selector). What is missing for a sellable MVP:
- **No payments** — zero processor code/keys in the repo. `.env` has only Clerk +
  OpenRouter + Hermes URL.
- **No subscription state** — `plan:"paid"` is set MANUALLY in Clerk `publicMetadata`.
- **No automated provisioning** — `WEBCHAT_AGENT_URLS` is a hardcoded file; the
  `pickaiengine` backend has NO agent-creation endpoint. New paid customers currently
  need manual dev work.

Decisions from this session:
- User has **no Stripe account** → needs free-to-test, cheap-later, easy option.
- User said "you are Hermes, you should know" about provisioning. CLARIFICATION: I am
  a Hermes *Agent* (the assistant), NOT the PickAIChat *platform backend*
  (`mail.pickaichat.com`). I do not have that backend's source here. Evidence I CAN
  confirm: `pickaiengine` has no agent-create API; the chat just POSTs to `/api/webchat`.
  => provisioning automation is UNVERIFIED and must be treated as "needs a small API"
  until proven otherwise.

## Constraints (from memory)
- No public pricing numbers; "contact us" strategy; keep "affordable" messaging.
- No tracking/analytics (ethical stance) → no cookie banner.
- Repo is Lovable-connected → NO force-push / rebase / amend / squash of pushed
  commits. Keep `main` working; commit linearly.
- Auto-deploys to Vercel on push to `main`.

---

## RECOMMENDED MVP PATH (two phases)

### Phase A — Zero-cost "contact us" upgrade (ships today, no processor)
Leverages the existing `plan:"paid"` gate I already built. Free users CANNOT pay
in-app yet; they need a path to reach you.

Tasks:
1. Add an "Unlock paid chat" CTA on `/free-chat` (replace/augment the "Free" badge)
   → links to `/contact` or opens `mailto:contact@pickaichat.com` with a prefilled
   subject ("Paid chat access request — <email>").
2. On the dashboard, show plan status ("Free" vs "Paid") and the same CTA when free.
3. You manually flip `plan:"paid"` in Clerk for the customer → they immediately get
   `/chat` + their agent (manual provisioning, see Phase B step for their agent URL).
- Cost: €0. Time: ~1 short session. Uses current gate, no new deps.
- Fits "contact us / no public pricing" posture perfectly.

### Phase B — Real processor (when you want self-serve payments)
Pick ONE. Both are free to test, cheap later, easy:

**Option 1 — Stripe (recommended for webhook→Clerk simplicity)**
- Create Stripe account (free; test mode = €0, no fees until live).
- Live fees: 2.9% + 30¢/tx. Not "expensive."
- One Price for MVP (e.g. Starter). Keep tiers hidden behind "contact us" per strategy.
- Server route `/api/checkout` (Stripe Checkout Session) → redirect to Stripe.
- `stripe webhook` → on `checkout.session.completed`, read `client_reference_id`
  (Clerk userId) → `clerk.users.updateUser(userId, { publicMetadata: { plan:"paid" } })`.
- Env: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (test first).

**Option 2 — Lemonsqueezy (built-in VAT/tax, solo-founder friendly)**
- Free to start; ~5% + card fees; merchant-of-record (handles EU VAT for you).
- Webhook `subscription_created` → same Clerk flag flip.
- Easier tax compliance if you sell to EU customers and don't want to file VAT.

Both replace the manual flip with an automatic one. Either is fine; Stripe is the
lower-friction integration with Clerk.

### Phase C — Automated provisioning (the real MVP unlock)
UNVERIFIED: does `mail.pickaichat.com` expose an agent-create endpoint?
- If YES: webhook (Phase B) calls it → gets the customer's agent URL → stores in a
  server-side config/DB keyed by email → `resolveHermesUrl` reads from there instead
  of the hardcoded `WEBCHAT_AGENT_URLS` file.
- If NO (likely, based on evidence): build a tiny provisioning endpoint on the Hermes
  side that creates an agent + returns its URL. Until then, provisioning stays manual
  (you stand up the agent + add the `WEBCHAT_AGENT_URLS` entry, like Jose).

MVP reality: Phase A + manual provisioning is enough to sell to your first real
customers. Phase C automation is what lets you scale past hand-setup.

---

## Open questions for approval
1. Phase A only, or also wire Stripe/Lemonsqueezy now? (I recommend A first, B after
   you create the account.)
2. If B: Stripe or Lemonsqueezy?
3. Provisioning: do you know if the Hermes platform can auto-create customer agents?
   (I'll need to inspect `mail.pickaichat.com` / its repo to confirm — not in this repo.)
4. Single MVP tier name/price for the "contact us" message (e.g. "Paid chat — $29/mo")?

## Files likely touched
- `src/components/ChatView.tsx` (free CTA), `src/routes/dashboard.tsx` (plan status)
- `src/routes/chat.tsx` / new `src/routes/api/checkout.ts` (Stripe/LS, Phase B)
- `src/utils/api.ts` (`WEBCHAT_AGENT_URLS` → server config, Phase C)
- `.env` (+ Vercel env vars) for processor keys (Phase B)

## Verification
- Phase A: log in as free user → CTA visible → email you → you flip plan → reload →
  lands on `/chat`.
- Phase B: test-mode checkout → webhook flips `plan` → `/chat` unlocked, no manual step.
- Phase C: new customer auto-gets agent URL, no code edit.
