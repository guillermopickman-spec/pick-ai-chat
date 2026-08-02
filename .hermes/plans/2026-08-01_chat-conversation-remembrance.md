# Chat: mirrored free/paid shell + two-layer Hermes remembrance

> **Hermes:** Plan mode. Implement task-by-task only after approval. Frontend-only work in the PickAIChat repo (`feature/free-chat` branch).

## Goal
1. **One shared chat UI ("the mirror")** used by both the paid and free chat — identical aesthetics, single source of truth so updating one side updates the other.
2. **Different backends behind the shared shell:**
   - Paid (`/chat`): Hermes agent with **two-layer remembrance** (in-thread history + long-term memory fallback).
   - Free (`/free-chat`): plain OpenRouter chat, **stateless backend**, but **multi-thread conversations saved locally** (localStorage) so the UI mirrors exactly.
3. The chat must talk **directly to Hermes** (platform endpoint) — NOT routed by email. The email auto-reply engine (Wilson → IONOS) is a separate system and stays out of the chat path.

## Architecture

**The mirror pattern (key idea):**
- A single presentational component `ChatView` renders the entire shell: header, conversation sidebar (multi-thread), message list, input, typing indicator.
- A single hook `useChatSession(mode: "hermes" | "free")` provides the data + actions. `mode` selects the backend. Both routes render `<ChatView />` fed by the same hook with a different `mode`.
- Because there is exactly **one** component and **one** hook, any visual change propagates to both sides automatically — no drift.

**Two distinct backends, never conflated:**

| Aspect | FREE (`mode="free"`) | PAID (`mode="hermes"`) |
|---|---|---|
| Route | `/free-chat` | `/chat` (Clerk-protected) |
| Send function | `sendChatMessage` → `chatWithAI` (`src/lib/chat-server.ts`, OpenRouter) | `sendToHermesBot` (`src/utils/api.ts` → `/api/webchat`) |
| Backend | OpenRouter, local model, **stateless** | Hermes agent (`mail.pickaichat.com` via `VITE_HERMES_API_URL`) |
| Conversation storage | **localStorage only** (multi-thread, no server) | Server (per paying user) |
| Remembrance | None (stateless echo; local history is display-only) | **Two-layer**: in-thread history + memory fallback |
| System prompt | none | the two-layer prompt (Task 6) |
| Users | signed-out visitors + free (non-paid) users | manually-flagged paid users (`Clerk publicMetadata.plan === "paid"`) |

- The landing-page `Chatbot` terminal widget (hero) is a separate marketing demo and is **out of scope**; optionally it could later be swapped to the mirror too, but that is not part of this plan.
- Paid users are **manually appointed** for now via Clerk `publicMetadata.plan = "paid"`. Real tier enforcement is deferred to the payment-system work.

## Two-layer remembrance (paid side only)
The Hermes agent distinguishes two context sources and phrases replies accordingly:
- **Layer 1 — in-thread (same conversation):** the hook sends the full prior message history of THAT conversation with every request (keyed by `conversation_id`). Agent answers directly: *"You just said Rex."*
- **Layer 2 — cross-conversation memory:** a different conversation sends NO history of the other thread (separate `conversation_id`). Agent falls back to long-term memory. If it remembers: *"From what I remember, your dog's name is Rex — is that right?"* If not: *"I don't know."* It must never say "you just said…" when the fact came from memory.
- Layer 1 is delivered by sending `history` in the payload (Task 3). Layer 2 is the agent's natural fallback; the system prompt (Task 6) steers the phrasing.

## Root cause of the original bug
`sendToHermesBot` (src/utils/api.ts) shipped only `{ message, conversation_id, user }`. The agent received one message per turn with no prior context → "in this conversation you haven't asked anything." Fix = send full `history` + a system prompt teaching the two layers.

## Tasks

### Task 1: Unify the data hook — `useChatSession(mode)`
**Objective:** One hook serving both backends so `ChatView` is backend-agnostic.
**Files:** Modify `src/hooks/useConversations.ts` (rename concept to `useChatSession`, keep export alias if needed) OR create `src/hooks/useChatSession.ts`.

Steps:
1. Define the shared shape returned:
   ```ts
   {
     conversations, activeId, activeConversation, loading,
     createConversation, deleteConversation, switchConversation,
     addMessage, send, // send(text) handles mode internally
   }
   ```
2. `mode === "hermes"`: keep existing server logic (load/save via `api.getConversations`/`saveMessage`/etc.), and `send` calls `sendToHermesBot(text, id, user, history, HERMES_SYSTEM_PROMPT)` (Task 3/6).
3. `mode === "free"`: replace server calls with a localStorage CRUD module (Task 4). `send` calls `sendChatMessage(settings, text)` (stateless; local history kept only for display).
4. `history` for the Hermes send is built from `activeConversation.messages` (map to `{role, content}`), excluding the just-added user message only if the endpoint expects prepend.
5. Type-check, commit: `git commit -m "refactor: unify chat session hook for hermes + free backends"`.

### Task 2: Extract presentational `ChatView`
**Objective:** Single shell used by both routes; no backend-specific code inside.
**Files:** Refactor `src/components/ChatUI.tsx` → `src/components/ChatView.tsx` (presentational). Delete admin agent switcher (it was the wrong feature — testing Wilson's bot is just logging in as Wilson).
Steps:
1. Move all UI into `ChatView`, receiving session state/actions via props (or calling `useChatSession` with a `mode` prop passed from the route).
2. Remove `isAdmin` / `agentOptions` / `showAgentMenu` / override code entirely.
3. Keep the sidebar (multi-thread) — it is part of the mirror and used by both modes.
4. `git commit -m "refactor: extract shared ChatView shell (mirror)"`.

### Task 3: `sendToHermesBot` — send history + system prompt, fixed platform URL
**Objective:** Deliver Layer 1; stop email-routing confusion.
**Files:** `src/utils/api.ts`.
Steps:
1. `export async function sendToHermesBot(message, conversationId, user, history = [], systemPrompt?)`.
2. `baseUrl = import.meta.env.VITE_HERMES_API_URL || DEFAULT_HERMES_URL` (platform Hermes, NOT email). Remove `USER_AGENT_URLS`/override usage from the chat path (grep to ensure email engine still works independently).
3. Body: `{ message, conversation_id, user, history, system_prompt: systemPrompt }`.
4. Return `{ reply, title }` from `data.reply`/`data.title`. Throw on non-ok.
5. Remove `setOverrideHermesUrl`/`getOverrideHermesUrl`/`getAgentOptions` if unused elsewhere.
6. `git commit -m "feat: send history + system prompt to Hermes; drop email routing"`.

### Task 4: Free local storage module
**Objective:** Multi-thread free conversations persist locally (mirror the sidebar behavior without a server).
**Files:** Create `src/lib/freeStore.ts`.
Steps:
1. `listConversations()`, `getConversation(id)`, `upsertConversation(conv)`, `deleteConversation(id)` backed by `localStorage` key `pickaichat.free.conversations.v1`.
2. Same `Message` shape as the paid side so `ChatView` needs no branching.
3. `git commit -m "feat: local storage for free multi-thread conversations"`.

### Task 5: Add `/free-chat` route + wire routing
**Objective:** Free users/visitors get the mirrored chat page.
**Files:** Create `src/routes/free-chat.tsx`; modify `src/routes/chat.tsx` guard; modify `src/components/Navbar.tsx`; modify `src/routes/dashboard.tsx` (line 357 if present).
Steps:
1. `free-chat.tsx`: `<ChatView />` fed by `useChatSession("free")` (or `<ChatView mode="free" />`), wrapped in `Navbar` + layout like `/chat`.
2. `/chat` guard: unauthenticated → redirect `/free-chat`. (Paid/free destination chosen client-side via Clerk metadata.)
3. Navbar: `Chat` link → `isPaid ? "/chat" : "/free-chat"` (desktop + mobile). Read `plan` from `user.publicMetadata`.
4. Dashboard chat link → free users `/free-chat`, paid `/chat`.
5. Regenerate route tree; `npx tsc --noEmit --pretty`; commit: `git commit -m "feat: /free-chat route + plan-based chat routing"`.

### Task 6: System prompt for the two layers (paid only)
**Objective:** Teach the agent to phrase Layer-1 directly and Layer-2 as memory + admit ignorance.
**Files:** `src/components/ChatView.tsx` (define `HERMES_SYSTEM_PROMPT` constant, pass into Hermes `send`).
Steps:
1. Add constant:
   ```
   You are PickAIChat, an AI assistant for a paying user.
   1) IN-THREAD HISTORY: if the history field contains earlier messages from THIS chat, answer directly from it (e.g. "You just said Rex"). Do not claim you "remember" it elsewhere — it is in the thread.
   2) LONG-TERM MEMORY: if a question can't be answered from the thread, fall back to memory. When answering from memory, say so and confirm (e.g. "From what I remember, your dog's name is Rex — is that right?"). Never present a memory answer as if just stated here.
   3) IF UNSURE: no thread history and no confident memory → say plainly "I don't know." Never invent facts.
   Be concise and friendly.
   ```
2. Pass it only when `mode === "hermes"`.
3. `git commit -m "feat: two-layer system prompt for Hermes remembrance"`.

### Task 7: Verify
**Objective:** Prove the mirror + two-layer behavior. (Run during execution, not plan mode.)
Steps:
1. `npx tsc --noEmit --pretty` clean.
2. **Mirror check:** `/chat` and `/free-chat` render identical shell (sidebar, input, bubbles).
3. **Layer 1 (paid):** new chat → "My dog's name is Rex." → "What is my dog's name?" → *"You just said Rex."*
4. **Layer 2 (paid):** new chat (different id) → "What is my dog's name?" → *"From what I remember, your dog's name is Rex — is that right?"* or *"I don't know."* (never "you just said").
5. **Free mirror + local persistence:** in `/free-chat`, create 2 threads, type in both; refresh → threads + messages persist (localStorage). Sending works via OpenRouter. No history sent to backend (stateless).
6. **Reload (paid):** refresh `/chat`, reopen conversation → messages load from server; re-ask → still answers from thread.
7. **Server field check:** confirm `/api/webchat` honors `history` + `system_prompt`; adjust field names if needed (frontend change is correct regardless).

## Files changed summary
- `src/hooks/useChatSession.ts` (new) or `src/hooks/useConversations.ts` (generalized) — unified backend hook.
- `src/components/ChatView.tsx` (new, from ChatUI) — single mirrored shell; admin switcher removed.
- `src/utils/api.ts` — `sendToHermesBot` sends `history` + `system_prompt`; fixed platform URL; drop override/admin helpers.
- `src/lib/freeStore.ts` (new) — localStorage for free multi-thread.
- `src/routes/free-chat.tsx` (new) — free mirrored chat page.
- `src/routes/chat.tsx` — guard → `/free-chat` for unauthenticated.
- `src/components/Navbar.tsx` — plan-based Chat link.
- `src/routes/dashboard.tsx` — free chat link.
- `src/routeTree.gen.ts` — regenerated.

## Risks / open questions
- **Server field name:** plan assumes `/api/webchat` accepts `history` + `system_prompt`. Verify in Task 7; adjust payload key if different.
- **Free backend statelessness:** `sendChatMessage`/`chatWithAI` takes a single message. We keep local history for display only; it is NOT sent to OpenRouter. Confirm that's acceptable (free chat won't "remember" across turns via the model — only locally stored threads).
- **Clerk metadata timing:** `publicMetadata.plan` is read client-side; until the payment system exists, set it manually in Clerk dashboard for paid users.
- **Email engine isolation:** ensure removing `USER_AGENT_URLS` from the chat path does not break the Wilson→IONOS email auto-reply (grep before deleting).
- **Payload size:** long Hermes threads grow the request; cap to last N turns later if needed.
