import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { Navbar } from "@/components/Navbar";
import { ChatUI } from "@/components/ChatUI";

const protectRoute = createServerFn().handler(async () => {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    throw redirect({ to: "/" });
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
      { name: "description", content: "Chat with PickAIChat AI assistant." },
      { property: "og:title", content: "Chat — PickAIChat" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ChatRoute,
});

function ChatRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <ChatUI />
      </main>
    </div>
  );
}