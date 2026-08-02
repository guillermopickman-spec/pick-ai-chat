import { useState } from "react";
import { CreditCard, Smartphone, MessageSquare, Check } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";
import {
  getActivePaymentMethods,
  type PaymentMethod,
} from "../lib/paymentMethods";

const ICONS: Record<string, typeof CreditCard> = {
  paypal: CreditCard,
  stripe: CreditCard,
  bizum: Smartphone,
  contact: MessageSquare,
};

function scrollOrNavigateToContact() {
  const el = document.getElementById("contact");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.href = "/contact?upgrade=1";
  }
}

export function PaymentMethods() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);
  const methods = getActivePaymentMethods();

  function handle(method: PaymentMethod) {
    if (method.id === "contact") {
      scrollOrNavigateToContact();
      return;
    }
    if (method.href?.trim()) {
      window.open(method.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (method.value?.trim()) {
      navigator.clipboard
        ?.writeText(method.value)
        .then(() => {
          setCopied(method.id);
          window.setTimeout(() => setCopied(null), 2500);
        })
        .catch(() => {});
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card/40 p-6 text-center">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-magenta">
        {t("payment.title")}
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">{t("payment.desc")}</p>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        {methods.map((m) => {
          const Icon = ICONS[m.id] ?? CreditCard;
          const isContact = m.id === "contact";
          const isCopied = copied === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => handle(m)}
              className={
                "group inline-flex flex-1 items-center gap-3 rounded-xl border px-5 py-4 text-left transition sm:min-w-[200px] " +
                (isContact
                  ? "border-border text-foreground hover:border-magenta/60"
                  : m.highlight
                    ? "border-magenta/40 bg-magenta/5 text-foreground hover:brightness-110"
                    : "border-border/70 text-foreground hover:border-magenta/60")
              }
            >
              <Icon
                size={20}
                className={
                  isContact ? "shrink-0 text-muted-foreground" : "shrink-0 text-magenta"
                }
              />
              <span className="flex flex-col">
                <span className="text-sm font-semibold">
                  {m.label}
                  {isCopied && (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs font-normal text-magenta">
                      <Check size={12} /> {t("payment.copied")}
                    </span>
                  )}
                </span>
                {m.description && (
                  <span className="text-xs text-muted-foreground">
                    {m.value?.trim() ? m.value : m.description}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
