# LuminaCore Landing Page — Conversion & Trust Upgrade

## Goal

Turn the existing dark-themed landing page into a stronger conversion surface by adding trust signals, clearer buyer journey, and easier ways to start a conversation — while keeping the current aesthetic and terminal-style chatbot demo intact.

## Proposed Changes

### 1. Sticky Navigation Bar

- Add a minimal fixed header that appears after scrolling past the hero.
- Left: "LuminaCore" wordmark (monospace magenta).
- Center: anchor links to Features, Demo, Pricing, FAQ.
- Right: "Get Started" button that scrolls to pricing/contact.
- Mobile: hamburger menu with the same links.

### 2. Social Proof / Trust Section (after Features)

- Heading: "Built for teams shipping AI to production".
- Two sub-elements:
  - **Client logos bar**: 4–5 grayscale logo placeholders (named as placeholders the user can replace).
  - **Testimonial cards**: 2–3 short quotes with avatar initials, name, role, company. Use placeholder copy that clearly labels itself as sample text.

### 3. How It Works Section (after Social Proof)

- 3-step horizontal timeline:
  1. **Connect channels** — Telegram, WhatsApp, Web, Email.
  2. **Configure routing** — auth, rate limits, memory, LLM provider.
  3. **Deploy in 48h** — Docker-ready with zero-downtime updates.
- Use existing icons and magenta accent for step numbers.

### 4. FAQ Section (before Pricing or after, TBD)

- 5–6 expandable accordion items covering common buyer questions:
  - What channels are supported?
  - Can I use my own LLM API key?
  - What does "48-hour deployment" include?
  - Is there ongoing maintenance?
  - How does the upsell architecture work?
- Use the existing card/border styling.

### 5. Strengthened Pricing CTAs

- Convert pricing buttons from `<button>` to `<a>` or `<Link>` pointing to a new `/contact` route.
- Add a small reassurance line under each CTA ("No credit card required", "One-time payment", etc.).

### 6. Contact / Lead Capture Section (after Pricing)

- Simple form: Name, Email, Company, Message.
- No backend required for v1 — form can use a `mailto:` action or a lightweight client-side submission to a server function if the user wants to store leads.
- Decision point: store leads in Lovable Cloud (Supabase table) or keep it static with `mailto:`.

### 7. SEO & Metadata Touches

- Add canonical link and `og:image` placeholder guidance in `__root.tsx` / `index.tsx` head.
- Ensure each new section has an `id` for the sticky nav anchors.

## Files to Create / Edit

- `src/components/Navbar.tsx` — new sticky navigation.
- `src/components/SocialProof.tsx` — logos + testimonials.
- `src/components/HowItWorks.tsx` — 3-step timeline.
- `src/components/FAQ.tsx` — accordion FAQ.
- `src/components/Contact.tsx` — lead capture form.
- `src/components/Pricing.tsx` — edit CTA buttons + reassurance copy.
- `src/routes/index.tsx` — insert new sections between existing ones.
- `src/styles.css` — add any new utilities needed (accordion animation, nav transition).
- Optional: `src/routes/contact.tsx` — dedicated contact page if we move beyond the inline form.

## Open Decisions

1. **Testimonials**: Do you have real quotes/company names to use, or should I use clearly-labeled placeholder testimonials?
2. **Lead capture**: Should the contact form be a simple `mailto:` for now, or should I wire it to a Lovable Cloud database so you can collect leads?
3. **FAQ copy**: Are there specific questions your buyers ask, or should I use the generic starter list above?

## Scope Boundaries

- No changes to the chatbot demo logic unless requested.
- No backend required if `mailto:` is chosen.
- Keeps the existing dark/magenta design system and fonts.

## Success Criteria

- All new sections render correctly on desktop and mobile.
- Sticky nav links scroll smoothly to each section.
- Pricing CTAs open a contact flow.
- Placeholder content is clearly labeled so the user knows what to replace.
