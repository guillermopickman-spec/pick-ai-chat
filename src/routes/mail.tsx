import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { assertAdmin } from "@/lib/admin-users";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/lib/LanguageProvider";
import { Mail, Inbox, Send, Archive } from "lucide-react";

const protectRoute = createServerFn().handler(async () => {
  const { isAuthenticated, userId, sessionClaims } = await auth();
  if (!isAuthenticated) {
    throw redirect({ to: "/" });
  }
  // WIP: Mail is admin-only for now.
  const ok = await assertAdmin(userId, sessionClaims?.email as string | undefined);
  if (!ok) {
    throw redirect({ to: "/" });
  }
  return {};
});

export const Route = createFileRoute("/mail")({
  beforeLoad: async () => {
    await protectRoute();
  },
  head: () => ({
    meta: [
      { title: "Mail Dashboard — PickAIChat" },
      { name: "description", content: "Manage your AI email inbox." },
      { property: "og:title", content: "Mail Dashboard — PickAIChat" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MailRoute,
});

function MailRoute() {
  const { t } = useLanguage();

  const sidebarItems = [
    { icon: Inbox, label: "Inbox", active: true },
    { icon: Send, label: "Sent", active: false },
    { icon: Archive, label: "Archived", active: false },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
          {/* Sidebar */}
          <aside className="hidden w-56 shrink-0 md:block">
            <div className="mb-4 flex items-center gap-2">
              <Mail size={20} className="text-magenta" />
              <h2 className="font-semibold text-foreground">Mail</h2>
            </div>
            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    item.active
                      ? "bg-magenta/10 text-magenta font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Mail list */}
          <div className="flex-1 rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h3 className="text-sm font-semibold text-foreground">Inbox</h3>
              <p className="text-xs text-muted-foreground">Emails received by your AI agents</p>
            </div>
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Mail size={48} className="mb-4 text-muted-foreground/30" />
              <p className="text-sm font-medium text-foreground">No emails yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                When your AI agents receive emails, they'll appear here.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}