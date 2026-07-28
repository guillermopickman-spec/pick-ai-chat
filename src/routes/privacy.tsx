import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — PickAIChat" },
      { name: "description", content: "PickAIChat Privacy Policy" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-muted-foreground">Last updated: July 28, 2026</p>
      <div className="space-y-4 text-muted-foreground">
        <p>
          PickAIChat ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
        <p>
          When you sign in, we collect your email address and display name via Google OAuth authentication. We use Clerk, a third-party authentication provider, to manage this securely.
        </p>
        <h2 className="text-xl font-semibold text-foreground">How We Use Your Information</h2>
        <p>
          We use your information solely to provide and improve our service, including AI-powered chat functionality, email management, and account administration.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data. Authentication is handled by Clerk, which is SOC 2 compliant and GDPR-ready.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Contact</h2>
        <p>
          For questions about this policy, contact guillermopickman@gmail.com.
        </p>
      </div>
    </div>
  );
}