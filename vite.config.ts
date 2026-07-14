// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Toggle deployment target via DEPLOY_TARGET env var:
//   "vercel"    → Nitro preset: vercel
//   "cloudflare" (or unset) → Nitro preset: cloudflare-module (default)
const deployTarget = process.env.DEPLOY_TARGET ?? "cloudflare";

/** Nitro config per deployment target */
const nitroPreset = deployTarget === "vercel" ? "vercel" : "cloudflare-module";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    preset: nitroPreset,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
