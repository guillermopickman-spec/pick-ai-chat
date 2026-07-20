import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const MAX_LENGTHS = {
  name: 100,
  email: 255,
  company: 100,
  message: 1000,
};

function validate(values: FormState, t: (key: string, ...args: string[]) => string): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = t("contact.form.error.nameRequired");
  else if (name.length > MAX_LENGTHS.name)
    errors.name = t("contact.form.error.nameMax", String(MAX_LENGTHS.name));

  if (!email) errors.email = t("contact.form.error.emailRequired");
  else if (email.length > MAX_LENGTHS.email)
    errors.email = t("contact.form.error.emailMax", String(MAX_LENGTHS.email));
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t("contact.form.error.emailInvalid");

  if (!message) errors.message = t("contact.form.error.messageRequired");
  else if (message.length > MAX_LENGTHS.message)
    errors.message = t("contact.form.error.messageMax", String(MAX_LENGTHS.message));

  return errors;
}

export function ContactForm({
  onSubmitted,
  buttonClassName,
}: {
  onSubmitted?: () => void;
  buttonClassName?: string;
}) {
  const { t } = useLanguage();
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate(values, t);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const subject = encodeURIComponent(
      t("contact.form.subject", values.name, values.company || t("contact.form.sentAs")),
    );
    const body = encodeURIComponent(
      t("contact.form.body", values.name, values.email, values.company || t("contact.form.na"), values.message),
    );

    // Try POST to backend first
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      message: values.message.trim(),
    };

    fetch("https://mail.pickaichat.com/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "no-cors",
    }).catch(() => {
      // Fallback to mailto if backend unreachable
    });

    window.location.href = `mailto:hello@pickaichat.com?subject=${subject}&body=${body}`;
    onSubmitted?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
      noValidate
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-foreground">{t("contact.form.name")}</span>
          <input
            type="text"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            maxLength={MAX_LENGTHS.name}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-magenta"
            placeholder={t("contact.form.namePlaceholder")}
          />
          {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-foreground">{t("contact.form.email")}</span>
          <input
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            maxLength={MAX_LENGTHS.email}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-magenta"
            placeholder={t("contact.form.emailPlaceholder")}
          />
          {errors.email && <span className="text-xs text-destructive">{errors.email}</span>}
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-medium text-foreground">{t("contact.form.company")}</span>
          <input
            type="text"
            value={values.company}
            onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
            maxLength={MAX_LENGTHS.company}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-magenta"
            placeholder={t("contact.form.companyPlaceholder")}
          />
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-medium text-foreground">{t("contact.form.message")}</span>
          <textarea
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            maxLength={MAX_LENGTHS.message}
            rows={4}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-magenta"
            placeholder={t("contact.form.messagePlaceholder")}
          />
          {errors.message && <span className="text-xs text-destructive">{errors.message}</span>}
        </label>
      </div>

      <button
        type="submit"
        className={
          "group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-magenta px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 " +
          (buttonClassName ?? "")
        }
      >
        {t("contact.form.submit")}
        <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {t("contact.form.orEmail")}{" "}
        <a href="mailto:hello@pickaichat.com" className="text-magenta hover:underline">
          hello@pickaichat.com
        </a>
      </p>
    </form>
  );
}

export function ContactSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section id="contact" className="relative px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
          <CheckCircle size={48} className="mx-auto text-magenta" />
          <h2 className="mt-6 text-2xl font-bold text-foreground">
            {t("contact.form.success.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("contact.form.success.body")}
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 text-sm text-magenta hover:underline"
          >
            {t("contact.form.success.new")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
              {t("contact.section")}
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("contact.heading")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("contact.subtitle")}
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-magenta">✓</span> {t("contact.bullet1")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-magenta">✓</span> {t("contact.bullet2")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-magenta">✓</span> {t("contact.bullet3")}
              </li>
            </ul>
          </div>

          <ContactForm onSubmitted={() => setSubmitted(true)} />
        </div>
      </div>
    </section>
  );
}