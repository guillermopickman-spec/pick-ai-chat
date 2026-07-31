import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
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
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <TycoonGame />
      </main>
    </div>
  );
}