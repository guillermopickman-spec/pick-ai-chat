import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

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

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "El nombre es obligatorio";
  else if (name.length > MAX_LENGTHS.name)
    errors.name = `El nombre no puede superar los ${MAX_LENGTHS.name} caracteres`;

  if (!email) errors.email = "El email es obligatorio";
  else if (email.length > MAX_LENGTHS.email)
    errors.email = `El email no puede superar los ${MAX_LENGTHS.email} caracteres`;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Introduce un email válido";

  if (!message) errors.message = "El mensaje es obligatorio";
  else if (message.length > MAX_LENGTHS.message)
    errors.message = `El mensaje no puede superar los ${MAX_LENGTHS.message} caracteres`;

  return errors;
}

export function ContactForm({
  onSubmitted,
  buttonClassName,
}: {
  onSubmitted?: () => void;
  buttonClassName?: string;
}) {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const subject = encodeURIComponent(
      `PickAIChat — consulta de ${values.name} (${values.company || "Sin empresa"})`,
    );
    const body = encodeURIComponent(
      `Nombre: ${values.name}\nEmail: ${values.email}\nEmpresa: ${values.company || "N/A"}\n\nMensaje:\n${values.message}`,
    );
    window.location.href = `mailto:hello@pickaichat.dev?subject=${subject}&body=${body}`;
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
          <span className="text-xs font-medium text-foreground">Nombre</span>
          <input
            type="text"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            maxLength={MAX_LENGTHS.name}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-magenta"
            placeholder="Tu nombre"
          />
          {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-foreground">Email</span>
          <input
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            maxLength={MAX_LENGTHS.email}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-magenta"
            placeholder="tu@email.com"
          />
          {errors.email && <span className="text-xs text-destructive">{errors.email}</span>}
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-medium text-foreground">Empresa</span>
          <input
            type="text"
            value={values.company}
            onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
            maxLength={MAX_LENGTHS.company}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-magenta"
            placeholder="Nombre de tu negocio"
          />
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-medium text-foreground">Mensaje</span>
          <textarea
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            maxLength={MAX_LENGTHS.message}
            rows={4}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-magenta"
            placeholder="Cuéntanos qué necesitas..."
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
        Enviar mensaje
        <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        O envíanos un email directamente a{" "}
        <a href="mailto:hello@pickaichat.dev" className="text-magenta hover:underline">
          hello@pickaichat.dev
        </a>
      </p>
    </form>
  );
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section id="contact" className="relative px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
          <CheckCircle size={48} className="mx-auto text-magenta" />
          <h2 className="mt-6 text-2xl font-bold text-foreground">
            Mensaje listo en tu correo
          </h2>
          <p className="mt-3 text-muted-foreground">
            Solo tienes que darle a enviar en tu aplicación de email y te responderemos en menos de
            24 horas.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 text-sm text-magenta hover:underline"
          >
            Enviar otro mensaje
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
            // Empieza ahora
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Listo para que tu negocio responda solo?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cuéntanos qué necesitas y te enviamos un plan personalizado en menos de 24 horas. Sin
            compromiso, sin tarjeta de crédito.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="text-magenta">✓</span> Sin tarjeta de crédito para empezar
            </li>
            <li className="flex items-center gap-2">
              <span className="text-magenta">✓</span> Configuración en 24 horas
            </li>
            <li className="flex items-center gap-2">
              <span className="text-magenta">✓</span> Soporte en español, de Sevilla para el mundo
            </li>
          </ul>
          </div>

          <ContactForm onSubmitted={() => setSubmitted(true)} />
        </div>
      </div>
    </section>
  );
}
