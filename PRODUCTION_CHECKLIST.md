# 🏨 PickAIChat — Production Checklist (Hotel Audit)

> **Mental model:** PickAIProject = The Hotel, PickAIChat = Rooms & Amenities, PickAIEngine = The Staff

---

## ✅ Already Built — The Park is Open

| Area | Status | Notes |
|------|--------|-------|
| 🏛️ **Visitor Center** (Landing page) | ✅ | Hero, features, tech, testimonials, pricing, about, FAQ sections |
| 🚪 **Entrance** (Sign-in/up) | ✅ | Google login working (Clerk) |
| 🗺️ **Map** (Navbar) | ✅ | Smooth scroll on homepage, routing on subpages |
| 🖼️ **Logo & Favicon** | ✅ | LOGO-TAB.png hand icon, favicon.ico at root |
| 🌐 **Language toggle** | ✅ | EN/ES toggle present |
| 📄 **Features page** | ✅ | `/features` route exists with content |
| 📄 **Pricing page** | ✅ | `/pricing` route exists |
| 📄 **FAQ page** | ✅ | `/faq` route exists |

---

## ❌ CRITICAL — Legal Requirements (Must Have Before Launch)

- [x] **📄 Privacy Policy** — ✅ live at `/privacy`
- [x] **📄 Terms of Service** — ✅ live at `/terms`

---

## ⚠️ IMPORTANT — Visitors Will Notice

- [ ] **❓ FAQ page** — empty (heading without actual questions)
- [ ] **💲 Clear pricing** — 3 of 4 plans say "Contact Us" with no visible prices
- [ ] **🎮 Working chat demo** — textbox exists but send button is disabled
- [ ] **🔐 Post-login experience** — what happens after sign-in? Is there a dashboard?
- [ ] **🌐 ES content** — check if Spanish version is complete
- [ ] **🌐 EN content** — check if English version is complete

---

## 🎯 NICE-TO-HAVE — Would Impress Visitors

- [ ] **📱 WhatsApp QR flow** — "Scan QR → Configure → Go live" steps mentioned but not functional
- [ ] **💬 Live support chat** — Chat button exists — is it real or placeholder?
- [ ] **📊 Real testimonials** — Generic business names (Ferretería, Clínica, Pizzeria) — need real ones
- [ ] **📝 "Multi-tool Integrated"** — feature card has no description text
- [ ] **📝 "7 days free trial"** — feature card has no description text
- [ ] **📱 Mobile responsiveness** — verify layout on mobile
- [ ] **🎥 Demo video / walkthrough** — visual demo of the agent in action

---

## 💡 Business Ideas (Saved Skills)

### 🎮 Tycoon Real Company Builder (`business-ideas/tycoon-real-company-builder`)
A game that isn't a game — SimCity/Zoo Tycoon style tycoon builder where players build a company through gamified decisions, but every choice actually creates the real business behind the scenes.