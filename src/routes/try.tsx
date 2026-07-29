import { createFileRoute } from "@tanstack/react-router";
import { TryChat } from "@/components/TryChat";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/try")({
  head: () => ({
    meta: [
      { title: "Try PickAIChat — Free AI Chat" },
      { name: "description", content: "Try PickAIChat for free. AI that does everything for your business." },
    ],
  }),
  component: TryPage,
});

function TryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <TryChat />
      </main>
    </div>
  );
}