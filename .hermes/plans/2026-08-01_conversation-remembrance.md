# Conversation Remembrance — Load Messages from Hermes Server

> **For Hermes:** Implement this plan task-by-task using `delegate_task` or direct execution.

**Goal:** Paying users' conversations are fully remembered — messages are loaded from the Hermes server when a conversation is opened, not just from `localStorage`.

**Architecture:** PickAIChat chat is a web alternative to Telegram for paying users. Each user connects to their own Hermes agent (routed by email via `USER_AGENT_URLS`). The Hermes server stores conversations with full message history. The frontend must load that history from the server instead of only reading `localStorage`.

**Root cause:** `useConversations.ts` calls `fetchConversations(user)` which returns *summaries* (titles, timestamps, no messages). These are converted to `Conversation` objects with `messages: []` — empty arrays. Messages are only added via `addMessage` which writes to `localStorage`. The server's `getConversation` API exists but is never called.

**Tech Stack:** TypeScript, React hooks, Hermes webchat API

---

### Task 1: Load full conversation messages from server on activation

**Objective:** When a conversation is selected (on mount or via `switchConversation`), load its full message history from the Hermes server.

**Files:**
- Modify: `src/hooks/useConversations.ts`

**Step 1: Add `getConversation` import**

Add to the existing imports:
```typescript
import {
  fetchConversations,
  deleteConversationApi,
  getConversation,              // ← ADD
  type ConversationSummary,
} from "@/utils/api";
```

**Step 2: Add state for loading messages**

After `const [loading, setLoading] = useState(false);`, add:
```typescript
const [loadingMessages, setLoadingMessages] = useState(false);
```

**Step 3: Create `loadConversationMessages` function**

Before the `persist` function, add:
```typescript
const loadConversationMessages = useCallback(async (convId: string) => {
  if (!user) return;
  setLoadingMessages(true);
  try {
    const detail = await getConversation(user, convId);
    if (detail && detail.messages) {
      const current = loadLocalConversations();
      const updated = current.map(c =>
        c.id === convId
          ? { ...c, messages: detail.messages.map(m => ({ id: m.id, role: m.role as "user" | "assistant", content: m.content, timestamp: m.timestamp })) }
          : c
      );
      saveLocalConversations(updated);
      setConversations(updated);
    }
  } catch (err) {
    console.error("Failed to load conversation messages:", err);
  } finally {
    setLoadingMessages(false);
  }
}, [user]);
```

**Step 4: Call it when `activeId` changes**

After the initial mount `useEffect`, add:
```typescript
// Load messages when switching conversations
useEffect(() => {
  if (activeId && user) {
    loadConversationMessages(activeId);
  }
}, [activeId, user, loadConversationMessages]);
```

**Step 5: Also on initial mount after loading conversation list**

In the mount `useEffect`, after the `fetchConversations` `.then()` block sets `activeId`, add the messages load for the initially selected conversation:

```typescript
.then((summaries) => {
  const convs = summaries.map(summaryToConversation);
  setConversations(convs);
  saveLocalConversations(convs);

  const saved = localStorage.getItem(ACTIVE_CONV_KEY);
  const targetId = saved && convs.find((c) => c.id === saved)
    ? saved
    : convs.length > 0 ? convs[0].id : null;
  setActiveId(targetId);

  // Load messages for the initially active conversation
  if (targetId) {
    getConversation(user, targetId).then(detail => {
      if (detail && detail.messages) {
        const current = loadLocalConversations();
        const updated = current.map(c =>
          c.id === targetId
            ? { ...c, messages: detail.messages.map(m => ({ id: m.id, role: m.role as "user" | "assistant", content: m.content, timestamp: m.timestamp })) }
            : c
        );
        saveLocalConversations(updated);
        setConversations(updated);
      }
    }).catch(err => console.error("Failed to load initial conversation messages:", err));
  }
})
```

**Step 6: Export `loadingMessages`**

In the return object, add:
```typescript
return {
  conversations,
  activeConversation,
  activeId,
  loading,
  loadingMessages,  // ← ADD
  createConversation,
  // ...
};
```

---

### Task 2: Show loading indicator while messages load

**Objective:** Give visual feedback while conversation messages are loading from the server.

**Files:**
- Modify: `src/components/ChatUI.tsx`

**Step 1: Import `loadingMessages`**

```typescript
const {
  conversations,
  activeConversation,
  activeId,
  loading,
  deleteConversation,
  switchConversation,
  addMessage,
} = useConversations(userEmail);
```

Change to destructure `loadingMessages` too (it's already exported from Task 1).

**Step 2: Show spinner in messages area**

In the messages area (around line 177-213), add a loading state:

```typescript
{/* Messages */}
<div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
  {loadingMessages ? (
    <div className="flex h-full items-center justify-center">
      <Loader2 size={20} className="animate-spin text-muted-foreground" />
      <span className="ml-2 text-sm text-muted-foreground">Loading conversation...</span>
    </div>
  ) : activeConversation && activeConversation.messages.length > 0 ? (
    // ... existing messages code
  ) : (
    // ... existing empty state
  )}
</div>
```

---

### Task 3: Remove admin agent switcher (not needed anymore)

**Objective:** Remove the admin agent switcher dropdown. Users' conversations route by email to their own Hermes agent. The chat always talks to the correct agent automatically.

**Files:**
- Modify: `src/components/ChatUI.tsx`
- Modify: `src/utils/api.ts`

**Step 1: Remove the admin dropdown section from ChatUI.tsx**

Remove the entire `{isAdmin && (` block (the agent switcher button + dropdown menu) from the top bar.

**Step 2: Clean up unused imports in ChatUI.tsx**

Remove `getAgentOptions`, `setOverrideHermesUrl`, `getOverrideHermesUrl` from the import.

**Step 3: Clean up unused code in api.ts**

Remove the `overrideHermesUrl` variable, `setOverrideHermesUrl`, `getOverrideHermesUrl`, and `getAgentOptions` functions. Keep only the email-based routing in `getUserHermesUrl`.

---

### Task 4: Verify the fix

**Objective:** Confirm conversations load from server properly.

**Steps:**
1. Log in as a test user
2. Send a message → creates a conversation on the server
3. Refresh the page
4. The existing conversation should appear in the sidebar with title (loaded from `fetchConversations`)
5. Click it → messages should load from the server via `getConversation`
6. Send another message → it should work with full context

---

### Files changed summary
- `src/hooks/useConversations.ts` — main fix: load messages from server
- `src/components/ChatUI.tsx` — loading indicator + remove agent switcher
- `src/utils/api.ts` — cleanup: remove override functions

### Risks and open questions
- **404 handling:** `getConversation` returns `null` on 404 (new conversation never saved to server). The code handles this: if no detail returned, keep local state.
- **Race conditions:** Multiple rapid conversation switches could cause stale data loading. The `useEffect` cleanup should abort stale requests (optional refinement).
- **localStorage merge:** Server messages are authoritative. The code replaces local messages with server messages on load. Any unsent local drafts would be lost — not a concern since messages are sent immediately.
- **Old conversations without server data:** If a conversation exists in localStorage but not on the server (e.g., from before the fix), it stays as-is with local messages only.