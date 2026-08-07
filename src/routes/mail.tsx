import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { useUser } from "@clerk/tanstack-react-start";
import { assertAdmin, getUserEmails } from "@/lib/admin-users";
import { MAIL_ENABLED_USERS, getMailApiUrl } from "@/utils/api";
import { Navbar } from "@/components/Navbar";
import { Mailbox } from "@/components/Mailbox";

const protectRoute = createServerFn().handler(async () => {
  const { isAuthenticated, userId, sessionClaims } = await auth();
  if (!isAuthenticated) {
    throw redirect({ to: "/" });
  }
  // Mail is for admins + enabled client users (each sees their own backend).
  const isAdmin = await assertAdmin(userId, sessionClaims?.email as string | undefined);
  const emails = await getUserEmails(userId, sessionClaims?.email as string | undefined);
  const isMailClient = emails.some((e) => MAIL_ENABLED_USERS.includes(e));
  if (!isAdmin && !isMailClient) {
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
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const apiBase = getMailApiUrl(email);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">
        <Mailbox apiBase={apiBase} />
      </main>
    </div>
  );
}