import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — PickAIChat" },
      { name: "description", content: "PickAIChat Terms of Service" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-8 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-4 text-muted-foreground">Last updated: July 28, 2026</p>
      <div className="space-y-4 text-muted-foreground">
        <p>
          By using PickAIChat ("the Service"), you agree to these Terms of Service.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Use of Service</h2>
        <p>
          You may use the Service for lawful purposes only. You agree not to misuse the Service or attempt to access it in unauthorized ways.
        </p>
        <h2 className="text-xl font-semibold text-foreground">User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account. You must provide accurate information when creating your account.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Limitation of Liability</h2>
        <p>
          The Service is provided "as is" without warranties of any kind. We are not liable for damages arising from your use of the Service.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Contact</h2>
        <p>
          For questions, contact guillermopickman@gmail.com.
        </p>
      </div>
    </div>
  );
}