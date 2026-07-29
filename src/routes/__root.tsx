import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Footer } from "../components/Footer";
import { ChatWidget } from "../components/ChatWidget";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { LanguageProvider, useLanguage } from "../lib/LanguageProvider";

function NotFoundComponent() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PickAIChat — Hub de Agentes AI para tu Negocio" },
      {
        name: "description",
        content: "Hub de agentes AI para WhatsApp, web y email. Automatiza tu negocio 24/7 con el agente multi-herramienta más económico del mercado.",
      },
      { name: "author", content: "Guillermo Pickman" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/logo/LOGO-ONLY-CHAT-CIRCULAR.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo/LOGO-ONLY-CHAT-CIRCULAR.png", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
    >
      <LanguageProvider>
        <RootShellInner>{children}</RootShellInner>
      </LanguageProvider>
    </ClerkProvider>
  );
}

function RootShellInner({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  return (
    <html lang={lang} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();
  const isTryPage = location.pathname === "/try";

  // Prevent browser scroll restoration — handle manually
  useEffect(() => {
    // Disable browser's built-in scroll memory
    history.scrollRestoration = "manual";

    // Handle hash scroll or scroll to top
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Wait a tick for the DOM to settle, then scroll to the hash element
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Footer />
      <PwaAuthGuard />
      {!isTryPage && <ChatWidget open={chatOpen} />}
      <WhatsAppButton chatOpen={chatOpen} onChatToggle={() => setChatOpen(v => !v)} hideChatToggle={isTryPage} />
    </QueryClientProvider>
  );
}

/** Force sign-in when opening the PWA standalone app for the first time */
function PwaAuthGuard() {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    const isStandalone =
      // iOS standalone mode
      (window.navigator as { standalone?: boolean }).standalone ||
      // Android/other PWA mode
      window.matchMedia("(display-mode: standalone)").matches;

    if (isStandalone && !isSignedIn) {
      // Redirect to Clerk sign-in, then back to home after login
      const signInUrl = `/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`;
      window.location.href = signInUrl;
    }
  }, [isLoaded, isSignedIn]);

  return null;
}