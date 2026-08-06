import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useUser } from "@clerk/tanstack-react-start";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { canAccessWip } from "@/lib/featureFlags";
import { isAdminEmail } from "@/utils/api";
import TycoonGame from "@/components/TycoonGame";

export const Route = createFileRoute("/tycoon")({
  head: () => ({
    meta: [
      { title: "PickAITycoon — Isometric Campus Builder" },
      { name: "description", content: "Build your AI campus in PickAITycoon." },
    ],
  }),
  component: TycoonPage,
});

function TycoonPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // WIP gate: Tycoon is admin-only for now. Bounce non-admins to home.
  useEffect(() => {
    if (!isLoaded) return;
    const emails = user?.emailAddresses?.map((e) => e.emailAddress) ?? [];
    const isAdmin = emails.some((e) => isAdminEmail(e));
    if (!canAccessWip({ emails, isAdmin })) {
      router.navigate({ to: "/" });
    }
  }, [isLoaded, user, router]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <TycoonGame />
      </main>
    </div>
  );
}
