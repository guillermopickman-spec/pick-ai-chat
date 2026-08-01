import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ChatView } from "@/components/ChatView";

export const Route = createFileRoute("/free-chat")({
  head: () => ({
    meta: [
      { title: "Free Chat — PickAIChat" },
      { name: "description", content: "Try PickAIChat free chat." },
    ],
  }),
  component: FreeChatRoute,
});

function FreeChatRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <ChatView mode="free" />
      </main>
    </div>
  );
}
