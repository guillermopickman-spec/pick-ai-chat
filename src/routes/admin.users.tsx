import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { useUser } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChatView } from "@/components/ChatView";
import { listClerkUsers, assertAdmin, isAdminEmail } from "@/lib/admin-users";
import { getClientAgentUrl } from "@/utils/api";

export const Route = createFileRoute("/admin/users")({
  beforeLoad: async () => {
    const { userId, sessionClaims } = await auth();
    const ok = await assertAdmin(userId, sessionClaims?.email as string | undefined);
    if (!ok) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Admin — Users — PickAIChat" },
      { name: "description", content: "Impersonate any user session." },
    ],
  }),
  component: AdminUsers,
});

interface ClerkUser {
  id: string;
  email: string;
  created_at: number;
  last_sign_in_at: number | null;
}

function AdminUsers() {
  const { user, isLoaded } = useUser();
  const [users, setUsers] = useState<ClerkUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeEmail, setActiveEmail] = useState<string | null>(null);
  const [activeName, setActiveName] = useState<string>("");

  useEffect(() => {
    if (!isLoaded) return;
    const emails = user?.emailAddresses?.map((e) => e.emailAddress) ?? [];
    if (!emails.some((e) => isAdminEmail(e))) return;
    listClerkUsers()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, [isLoaded, user]);

  // Guard
  if (isLoaded) {
    const emails = user?.emailAddresses?.map((e) => e.emailAddress) ?? [];
    if (!emails.some((e) => isAdminEmail(e))) return null;
  }

  // ── Impersonation view: full app session as the chosen user ──
  if (activeEmail) {
    const agentUrl = getClientAgentUrl(activeEmail) ?? undefined;
    return (
      <div className="relative h-[100dvh] w-full overflow-hidden">
        {/* Impersonation banner */}
        <div className="absolute inset-x-0 top-0 z-[60] flex items-center justify-between gap-2 bg-amber-500/90 px-4 py-1.5 text-xs font-semibold text-black">
          <span>
            🛡️ IMPERSONATING: {activeName} ({activeEmail}) — full session, writes
            saved to their account
          </span>
          <button
            onClick={() => {
              setActiveEmail(null);
              setActiveName("");
            }}
            className="rounded bg-black/20 px-2 py-0.5 font-medium text-black transition hover:bg-black/30"
          >
            Exit
          </button>
        </div>
        <div className="h-full pt-7">
          <ChatView mode="hermes" impersonatedUser={activeEmail} impersonatedAgentUrl={agentUrl} />
        </div>
      </div>
    );
  }

  // ── User board ──
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 pt-32 pb-24 text-foreground">
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            // Admin
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Select a user to enter their full app session (chat, history,
            agent). Writes are saved to their account.
          </p>

          {loading ? (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              Loading users…
            </p>
          ) : users.length === 0 ? (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              No users found.
            </p>
          ) : (
            <div className="mt-8 space-y-2">
              {users.map((u) => {
                const isAdminUser = isAdminEmail(u.email);
                const hasAgent = !!getClientAgentUrl(u.email);
                const lastSeen = u.last_sign_in_at
                  ? new Date(u.last_sign_in_at).toLocaleString()
                  : "never";
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      setActiveEmail(u.email);
                      setActiveName(u.email.split("@")[0]);
                    }}
                    className="group flex w-full items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 text-left transition hover:border-magenta/40 hover:bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-magenta/10 text-sm font-bold text-magenta">
                        {u.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {u.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last seen: {lastSeen}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isAdminUser && (
                        <span className="rounded-full bg-magenta/10 px-2 py-0.5 text-[10px] font-medium text-magenta">
                          Admin
                        </span>
                      )}
                      {hasAgent && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                          Paid agent
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground transition group-hover:text-magenta">
                        Enter →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
