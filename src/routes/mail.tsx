import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { assertAdmin } from "@/lib/admin-users";
import { Navbar } from "@/components/Navbar";
import { Mailbox } from "@/components/Mailbox";

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
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">
        <Mailbox />
      </main>
    </div>
  );
}