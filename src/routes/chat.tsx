import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { Navbar } from "@/components/Navbar";
import { ChatView } from "@/components/ChatView";

const protectRoute = createServerFn().handler(async () => {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    // Signed-out users land on the free chat, not a login wall.
    throw redirect({ to: "/free-chat" });
  }
  return {};
});

export const Route = createFileRoute("/chat")({
  beforeLoad: async () => {
    await protectRoute();
  },
  head: () => ({
    meta: [
      { title: "Chat — PickAIChat" },
      { name: "description", content: "Chat with your PickAIChat AI assistant." },
    ],
  }),
  component: ChatRoute,
});

function ChatRoute() {
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <main className="flex-1 overflow-hidden">
        <ChatView mode="hermes" />
      </main>
    </div>
  );
}
