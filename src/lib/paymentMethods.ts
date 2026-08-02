// ─────────────────────────────────────────────────────────────────────────────
//  PAYMENT METHODS — single source of truth
//
//  No company / autónomo required: use your PERSONAL accounts here
//  (PayPal.Me, Bizum to your phone, a Stripe Payment Link created as an
//  individual, or just "contact me" so you arrange payment by hand).
//
//  To enable a method: fill in `href` (opens in a new tab) or `value`
//  (shown + copied to clipboard, e.g. a phone number for Bizum).
//  Leave both empty and the method is hidden until you're ready.
//  `contact` is always shown as the manual fallback.
// ─────────────────────────────────────────────────────────────────────────────

export interface PaymentMethod {
  id: string;
  label: string;
  description?: string;
  /** Opens in a new tab (PayPal.Me, Stripe payment link, ...). */
  href?: string;
  /** Shown + copied when there is no href (e.g. Bizum phone number). */
  value?: string;
  /** Visually highlight this method (recommended default). */
  highlight?: boolean;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "paypal",
    label: "PayPal",
    description: "Pay with your PayPal account (personal link)",
    href: "https://paypal.me/gpg111", // TODO: e.g. https://paypal.me/guillermopickman
    highlight: true,
  },
  {
    id: "bizum",
    label: "Bizum",
    description: "Send via Bizum to my phone number",
    value: "+34 693 41 99 12", // TODO: e.g. +34 600 000 000
  },
  {
    id: "stripe",
    label: "Card (Stripe)",
    description: "Pay by card through a Stripe Payment Link",
    href: "", // TODO: your Stripe payment link
  },
  {
    id: "contact",
    label: "Contact me",
    description: "I'll send the details and activate your plan",
  },
];

/** Methods that are currently configured (contact is always included). */
export function getActivePaymentMethods(): PaymentMethod[] {
  return PAYMENT_METHODS.filter(
    (m) => m.id === "contact" || m.href?.trim() || m.value?.trim(),
  );
}
