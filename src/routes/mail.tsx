import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { useUser } from "@clerk/tanstack-react-start";
import { assertAdmin, getUserEmails } from "@/lib/admin-users";
import { MAIL_ENABLED_USERS, getMailApiUrl, isAdminEmail } from "@/utils/api";
import { Mail } from "lucide-react";
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
  // Match against ALL the user's emails (primary may differ from the mail
  // client key, e.g. Wilson has multiple addresses on his Clerk account).
  const emails = user?.emailAddresses?.map((e) => e.emailAddress) ?? [];
  const isAdmin = emails.some((e) => isAdminEmail(e));
  const mailEmail = emails.find((e) => MAIL_ENABLED_USERS.includes(e));
  // HARD RULE: only admins may ever see the platform/default mailbox. A
  // non-admin who isn't explicitly mapped to their own mail backend gets
  // locked out — never the admin inbox.
  if (!isAdmin && !mailEmail) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
        <Mail size={32} className="mb-2 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No mail access configured for this account.</p>
      </div>
    );
  }
  const apiBase = mailEmail ? getMailApiUrl(mailEmail) : "https://mail.pickaichat.com";
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">
        <Mailbox apiBase={apiBase} apiReady={!!mailEmail || isAdmin} />
      </main>
    </div>
  );
}