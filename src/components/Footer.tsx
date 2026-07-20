import { Github, Linkedin } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
            <img
              src="/logo/logo-only-200.webp"
              alt="PickAIChat"
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-mono text-sm text-magenta">PickAIChat</div>
            <p className="mt-1 text-sm text-foreground">
              {t("footer.built")}{" "}
              <span className="text-muted-foreground">{t("footer.role")}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/guillermopickman-spec"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:border-magenta hover:text-magenta"
          >
            <Github size={16} />
          </a>
          <a
            href="https://pickaichat.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Website"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:border-magenta hover:text-magenta"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </a>
          <a
            href="https://linkedin.com/in/guillermo-pickman"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:border-magenta hover:text-magenta"
          >
            <Linkedin size={16} />
          </a>
        </div>

        <div className="text-xs text-muted-foreground">{t("footer.made")}</div>
      </div>
      <div className="mx-auto mt-6 flex max-w-6xl justify-center gap-6 text-xs text-muted-foreground">
        <a href="/privacy" className="hover:text-magenta transition">Privacy Policy</a>
        <a href="/terms" className="hover:text-magenta transition">Terms of Service</a>
      </div>
    </footer>
  );
}