// Mailbox — read + sort @domain email by alias (auto-detected mailboxes).
// Backed by the PickAIEngine email webhook's /emails endpoints.
import { useEffect, useState, useCallback } from "react";
import { Mail, Inbox, ArrowLeft, Search, RefreshCw, Loader2 } from "lucide-react";

// CORM open on the webhook, so browser fetch works from the app.
const MAIL_API = "https://mail.pickaichat.com";

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

function timeAgo(iso: string): string {
  if (!iso) return "";
  const t = new Date(iso + "Z").getTime();
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return new Date(iso).toLocaleDateString();
}

export function Mailbox() {
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [active, setActive] = useState<string>("all");
  const [emails, setEmails] = useState<Summary[]>([]);
  const [selected, setSelected] = useState<EmailDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const loadAliases = useCallback(async () => {
    try {
      const r = await fetch(`${MAIL_API}/emails/aliases`);
      const d = await r.json();
      setAliases(d.aliases ?? []);
    } catch {
      /* ignore */
    }
  }, []);

  const loadEmails = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "60" });
      if (active !== "all") params.set("to", active);
      if (q) params.set("q", q);
      const r = await fetch(`${MAIL_API}/emails?${params}`);
      const d = await r.json();
      setEmails(d.emails ?? []);
    } finally {
      setLoading(false);
    }
  }, [active, q]);

  useEffect(() => {
    loadAliases();
  }, [loadAliases]);
  useEffect(() => {
    setSelected(null);
    loadEmails();
  }, [loadEmails, active]);

  async function openEmail(id: number) {
    try {
      const r = await fetch(`${MAIL_API}/emails/${id}`);
      const d = await r.json();
      setSelected(d);
    } catch {
      /* ignore */
    }
  }

  const total = active === "all"
    ? aliases.reduce((a, b) => a + b.count, 0)
    : aliases.find((a) => a.mailbox === active)?.count ?? 0;

  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
      {/* Sidebar — auto-detected aliases */}
      <aside className="hidden w-64 shrink-0 md:block">
        <div className="mb-4 flex items-center gap-2">
          <Mail size={20} className="text-magenta" />
          <h2 className="font-semibold text-foreground">Mail</h2>
        </div>
        <button
          onClick={() => setActive("all")}
          className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
            active === "all"
              ? "bg-magenta/10 text-magenta font-medium"
              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-3">
            <Inbox size={16} /> All mail
          </span>
          <span className="text-xs">{total > 0 ? total : ""}</span>
        </button>
        <div className="my-2 border-t border-border" />
        {aliases.length === 0 && (
          <p className="px-3 text-xs text-muted-foreground">No mailboxes yet</p>
        )}
        {aliases.map((a) => (
          <button
            key={a.mailbox}
            onClick={() => setActive(a.mailbox)}
            className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
              active === a.mailbox
                ? "bg-magenta/10 text-magenta font-medium"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            <span className="truncate">{a.mailbox}</span>
            <span className="ml-2 text-xs">{a.count}</span>
          </button>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          {selected ? (
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-muted-foreground transition hover:bg-accent/50 hover:text-foreground"
            >
              <ArrowLeft size={14} /> Back
            </button>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-foreground">
                {active === "all" ? "All mail" : active}
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
                  onClick={() => { loadEmails(); loadAliases(); }}
                  title="Refresh"
                  className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-accent/50 hover:text-foreground"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            </>
          )}
        </div>

        {selected ? (
          /* Reader */
          <div className="p-6">
            <h2 className="text-lg font-semibold text-foreground">{selected.subject}</h2>
            <div className="mt-1 text-xs text-muted-foreground">
              From <span className="text-foreground">{selected.from_addr}</span> · to{" "}
              <span className="text-foreground">{selected.to_addr}</span> ·{" "}
              {selected.received_at}
            </div>
            <div className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {selected.body}
            </div>
          </div>
        ) : (
          /* List */
          <>
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-24 text-sm text-muted-foreground">
                <Loader2 size={16} className="animate-spin" /> Loading…
              </div>
            ) : emails.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Mail size={48} className="mb-4 text-muted-foreground/30" />
                <p className="text-sm font-medium text-foreground">No emails in {active === "all" ? "your inbox" : active}</p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {emails.map((e) => (
                  <li
                    key={e.id}
                    onClick={() => openEmail(e.id)}
                    className="flex cursor-pointer items-center gap-3 px-5 py-3 transition hover:bg-accent/30"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-foreground">{e.from_addr}</span>
                        <span className="shrink-0 rounded-full bg-accent/60 px-2 py-0.5 text-[10px] text-muted-foreground">{e.to_addr}</span>
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
