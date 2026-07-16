import { Github, Linkedin, Palette } from "lucide-react";
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
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:border-magenta hover:text-magenta"
          >
            <Github size={16} />
          </a>
          <a
            href="https://artstation.com"
            target="_blank"
            rel="noreferrer"
            aria-label="ArtStation"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:border-magenta hover:text-magenta"
          >
            <Palette size={16} />
          </a>
          <a
            href="https://linkedin.com"
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
    </footer>
  );
}