// Mailbox — read + sort @domain email by alias, plus "Send with AI" chat composer.
import { useEffect, useState, useCallback } from "react";
import {
  Mail, Inbox, ArrowLeft, Search, RefreshCw, Loader2, Send, PenLine, Sparkles, Check, X,
} from "lucide-react";

// CORS open on the webhook, so browser fetch works from the app.
const DEFAULT_MAIL_API = "https://mail.pickaichat.com";

interface Summary {
  id: number;
  from_addr: string;
  to_addr: string;
  subject: string;
  received_at: string;
}
interface Alias {
  mailbox: string;
  count: number;
}
interface EmailDetail extends Summary {
  email_id?: string;
  body: string;
}
interface Draft {
  to: string;
  subject: string;
  body: string;
}

function timeAgo(iso: string): string {
  if (!iso) return "";
  const t = new Date(iso.endsWith("Z") ? iso : iso + "Z").getTime();
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return new Date(iso).toLocaleDateString();
}

/* ── "Send with AI" chat composer ─────────────────────────────────────────── */
function ComposeChat({ contextEmail, onSent, apiBase }:
  { contextEmail: EmailDetail | null; onSent: () => void; apiBase: string }) {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function ask() {
    const req = input.trim();
    if (!req || thinking) return;
    setError("");
    setThinking(true);
    setLines((p) => [...p, req]);
    try {
      const r = await fetch(`${apiBase}/emails/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request: req,
          context: contextEmail
            ? `From: ${contextEmail.from_addr}\nSubject: ${contextEmail.subject}\n\n${contextEmail.body}`
            : "",
        }),
      });
      const d = await r.json();
      if (d.draft) setDraft(d.draft);
      else setError(d.error || "Could not draft");
    } catch {
      setError("Network error");
    } finally {
      setThinking(false);
      setInput("");
    }
  }

  async function ship() {
    if (!draft || sending) return;
    setSending(true);
    setError("");
    try {
      const r = await fetch(`${apiBase}/emails/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const d = await r.json();
      if (d.ok) {
        setDone(true);
        setDraft(null);
        onSent();
      } else setError(d.error || "Send failed");
    } catch {
      setError("Network error");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15 text-green-500">
          <Check size={24} />
        </div>
        <p className="text-sm font-medium text-foreground">Email sent ✨</p>
        <button
          onClick={() => setDone(false)}
          className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-accent/50"
        >
          Compose another
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-5 py-3.5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles size={15} className="text-magenta" /> Send with AI
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Just describe the email — no need to write it.
          {contextEmail && " It'll be a reply to the open message."}
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-5 py-4">
        {lines.map((l, i) => (
          <div key={i} className="ml-auto w-fit max-w-[85%] rounded-2xl bg-magenta/10 px-3 py-2 text-sm text-foreground">
            {l}
          </div>
        ))}
        {thinking && (
          <div className="flex w-fit items-center gap-2 rounded-2xl bg-accent/50 px-3 py-2 text-sm text-muted-foreground">
            <Loader2 size={14} className="animate-spin" /> Drafting…
          </div>
        )}
        {error && <div className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-500">{error}</div>}
      </div>

      {draft && !thinking && (
        <div className="border-t border-border px-5 py-4">
          <input
            value={draft.to}
            onChange={(e) => setDraft({ ...draft, to: e.target.value })}
            placeholder="To"
            className="mb-2 w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-magenta"
          />
          <input
            value={draft.subject}
            onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
            placeholder="Subject"
            className="mb-2 w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-magenta"
          />
          <textarea
            value={draft.body}
            onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            rows={5}
            className="mb-3 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-magenta"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={ship}
              disabled={sending}
              className="flex items-center gap-2 rounded-lg bg-magenta px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              Send
            </button>
            <button
              onClick={() => { setDraft(null); setError(""); }}
              className="rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition hover:bg-accent/50"
            >
              Edit request
            </button>
          </div>
        </div>
      )}

      {!draft && (
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask()}
              placeholder="e.g. email Miguel we're free Friday 3pm, ask his phone"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-magenta"
            />
            <button
              onClick={ask}
              disabled={!input.trim() || thinking}
              className="flex items-center gap-1.5 rounded-lg bg-magenta px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            >
              <Sparkles size={15} /> Draft
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Mailbox({ apiBase = DEFAULT_MAIL_API }: { apiBase?: string }) {
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [active, setActive] = useState<string>("all");
  const [emails, setEmails] = useState<Summary[]>([]);
  const [selected, setSelected] = useState<EmailDetail | null>(null);
  const [sent, setSent] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [compose, setCompose] = useState(false);

  const loadAliases = useCallback(async () => {
    try {
      const r = await fetch(`${apiBase}/emails/aliases`);
      const d = await r.json();
      setAliases(d.aliases ?? []);
    } catch { /* ignore */ }
  }, []);

  const loadEmails = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "60" });
      if (active !== "all") params.set("to", active);
      if (q) params.set("q", q);
      const r = await fetch(`${apiBase}/emails?${params}`);
      const d = await r.json();
      setEmails(d.emails ?? []);
    } finally {
      setLoading(false);
    }
  }, [active, q]);

  const loadSent = useCallback(async () => {
    try {
      const r = await fetch(`${apiBase}/emails/sent?limit=60`);
      const d = await r.json();
      setSent(d.sent ?? []);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { loadAliases(); loadSent(); }, [loadAliases, loadSent]);
  useEffect(() => {
    setSelected(null);
    if (active !== "sent") loadEmails();
  }, [loadEmails, active]);

  async function openEmail(id: number) {
    try {
      const r = await fetch(`${apiBase}/emails/${id}`);
      const d = await r.json();
      setSelected(d);
    } catch { /* ignore */ }
  }

  const total = active === "all"
    ? aliases.reduce((a, b) => a + b.count, 0)
    : aliases.find((a) => a.mailbox === active)?.count ?? 0;

  const shown = active === "sent" ? sent : emails;

  /* Sidebar item */
  function SideBtn({ onClick, active, icon, label, count, right }:
    { onClick: () => void; active: boolean; icon: React.ReactNode; label: string; count?: string | number; right?: React.ReactNode }) {
    return (
      <button
        onClick={onClick}
        className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
          active ? "bg-magenta/10 text-magenta font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        }`}
      >
        <span className="flex min-w-0 items-center gap-3">
          {icon}
          <span className="truncate">{label}</span>
        </span>
        <span className="ml-2 flex shrink-0 items-center gap-1 text-xs">{right ?? count ?? ""}</span>
      </button>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 md:block">
        <div className="mb-4 flex items-center gap-2">
          <Mail size={20} className="text-magenta" />
          <h2 className="font-semibold text-foreground">Mail</h2>
        </div>
        <SideBtn onClick={() => { setCompose(false); setActive("all"); }} active={compose ? false : active === "all"} icon={<Inbox size={16} />} label="All mail" count={total} />
        {aliases.map((a) => (
          <SideBtn key={a.mailbox} onClick={() => { setCompose(false); setActive(a.mailbox); }} active={active === a.mailbox} icon={<Mail size={16} />} label={a.mailbox} count={a.count} />
        ))}
        <div className="my-2 border-t border-border" />
        <SideBtn onClick={() => { setCompose(false); setActive("sent"); }} active={active === "sent"} icon={<Send size={16} />} label="Sent" count={sent.length} />
        <div className="mt-3">
          <button
            onClick={() => { setCompose(true); setActive(""); }}
            className={`flex w-full items-center justify-center gap-2 rounded-lg bg-magenta px-3 py-2 text-sm font-medium text-white transition hover:opacity-90 ${compose ? "ring-2 ring-magenta/40" : ""}`}
          >
            <PenLine size={15} /> Send with AI
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          {compose ? (
            <button onClick={() => setCompose(false)} className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-muted-foreground transition hover:bg-accent/50 hover:text-foreground">
              <X size={14} /> Close
            </button>
          ) : selected ? (
            <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-muted-foreground transition hover:bg-accent/50 hover:text-foreground">
              <ArrowLeft size={14} /> Back
            </button>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-foreground">
                {active === "all" ? "All mail" : active === "sent" ? "Sent" : active}
              </h3>
              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search…"
                    className="w-40 rounded-lg border border-border bg-background py-1.5 pl-8 pr-3 text-xs outline-none transition focus:border-magenta"
                  />
                </div>
                <button
                  onClick={() => { loadEmails(); loadAliases(); loadSent(); }}
                  title="Refresh"
                  className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-accent/50 hover:text-foreground"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setCompose(true)}
                  title="Send with AI"
                  className="flex items-center gap-1 rounded-lg bg-magenta px-2 py-1.5 text-xs font-medium text-white md:hidden"
                >
                  <PenLine size={13} /> AI
                </button>
              </div>
            </>
          )}
        </div>

        {compose ? (
          <div className="h-[560px]">
            <ComposeChat contextEmail={selected} onSent={() => { loadSent(); }} apiBase={apiBase} />
          </div>
        ) : selected ? (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-foreground">{selected.subject}</h2>
            <div className="mt-1 text-xs text-muted-foreground">
              From <span className="text-foreground">{selected.from_addr}</span> · to{" "}
              <span className="text-foreground">{selected.to_addr}</span> · {selected.received_at}
            </div>
            <div className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{selected.body}</div>
            <button
              onClick={() => setCompose(true)}
              className="mt-6 flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition hover:bg-accent/50 hover:text-foreground"
            >
              <Sparkles size={14} /> Reply with AI
            </button>
          </div>
        ) : (
          <>
            {loading && active !== "sent" ? (
              <div className="flex items-center justify-center gap-2 py-24 text-sm text-muted-foreground">
                <Loader2 size={16} className="animate-spin" /> Loading…
              </div>
            ) : shown.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Mail size={48} className="mb-4 text-muted-foreground/30" />
                <p className="text-sm font-medium text-foreground">
                  No {active === "sent" ? "sent emails" : `emails in ${active === "all" ? "your inbox" : active}`}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {shown.map((e) => (
                  <li
                    key={`${active === "sent" ? "s" : "i"}${e.id}`}
                    onClick={() => active !== "sent" && openEmail(e.id)}
                    className="flex cursor-pointer items-center gap-3 px-5 py-3 transition hover:bg-accent/30"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-foreground">
                          {active === "sent" ? `→ ${e.to_addr}` : e.from_addr}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-sm text-muted-foreground">{e.subject}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(e.received_at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
