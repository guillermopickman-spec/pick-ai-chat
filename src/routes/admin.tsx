import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { useUser } from "@clerk/tanstack-react-start";
import { useEffect, useState, useCallback } from "react";
import {
  Activity, Server, Users, MessageSquare, Wifi, WifiOff,
  RefreshCw, HardDrive, Clock, AlertTriangle, ChevronDown, ChevronUp,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import {
  fetchAdminStatus, fetchAdminClients, fetchAdminStats,
  type ServerStatus, type Client, type StatsResponse,
} from "@/lib/admin-api";

const ADMIN_EMAIL = "pickaichat@gmail.com";

const protectAdmin = createServerFn().handler(async () => {
  const { userId, sessionClaims } = await auth();
  if (!userId) throw redirect({ to: "/" });
  // Also verify in the server fn
  const email = sessionClaims?.email as string | undefined;
  if (email !== ADMIN_EMAIL) throw redirect({ to: "/" });
  return {};
});

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    await protectAdmin();
  },
  head: () => ({
    meta: [
      { title: "Admin Dashboard — PickAIChat" },
      { name: "description", content: "System administration dashboard." },
    ],
  }),
  component: AdminDashboard,
});

// ── Status Dot ─────────────────────────────────────────────────────

function StatusDot({ status, pulse }: { status: boolean | null | "loading"; pulse?: boolean }) {
  const color =
    status === true
      ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
      : status === false || status === "offline"
        ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
        : "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]";

  return (
    <span
      className={`inline-block h-3 w-3 rounded-full ${color} ${
        pulse ? "animate-pulse" : ""
      }`}
    />
  );
}

// ── Stat Card ──────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition hover:border-magenta/40">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-magenta">
          {icon}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {sub && <p className="text-xs text-muted-foreground/70">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

// ── Server Card ────────────────────────────────────────────────────

function ServerCard({ name, data }: { name: string; data: ServerStatus["external_servers"][string] }) {
  const isOnline = data.status === "online";
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition hover:border-magenta/40">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Server size={16} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">{data.label}</h3>
        </div>
        <div className="flex items-center gap-2">
          <StatusDot status={isOnline} pulse={false} />
          <span className={`text-xs font-mono ${
            isOnline ? "text-green-500" : "text-red-500"
          }`}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="font-mono">{name}</span>
        {data.latency && (
          <span className="flex items-center gap-1">
            <Activity size={10} /> {data.latency}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Client Row ─────────────────────────────────────────────────────

function ClientRow({ client }: { client: Client }) {
  const lastActive = client.last_active
    ? new Date(client.last_active).toLocaleString()
    : "Never";

  return (
    <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card/30 px-4 py-3 text-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-magenta/10 text-xs font-bold text-magenta">
          {client.email[0].toUpperCase()}
        </div>
        <div>
          <p className="text-sm text-foreground">{client.email}</p>
          <p className="text-xs text-muted-foreground">Last active: {lastActive}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">{client.conversations}</p>
          <p className="text-xs text-muted-foreground">Conversations</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">{client.total_messages}</p>
          <p className="text-xs text-muted-foreground">Messages</p>
        </div>
      </div>
    </div>
  );
}

// ── Notifications ─────────────────────────────────────────────────

function getNotifications(status: ServerStatus | null): { type: "error" | "warning" | "info"; message: string }[] {
  const alerts: { type: "error" | "warning" | "info"; message: string }[] = [];

  if (!status) return alerts;

  // Check external servers
  for (const [key, srv] of Object.entries(status.external_servers)) {
    if (srv.status !== "online") {
      alerts.push({
        type: "error",
        message: `${srv.label} is ${srv.status} — check connectivity`,
      });
    }
  }

  // Check services
  if (status.services.web_app === false) {
    alerts.push({ type: "error", message: "Web app service is not running" });
  }
  if (status.services.api === false) {
    alerts.push({ type: "error", message: "API service is not running" });
  }

  // Info
  alerts.push({
    type: "info",
    message: `System running since ${status.server.uptime_since}`,
  });

  return alerts;
}

// ── Main Dashboard ────────────────────────────────────────────────

function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showClients, setShowClients] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [s, c, st] = await Promise.all([
        fetchAdminStatus(),
        fetchAdminClients(),
        fetchAdminStats(),
      ]);
      setStatus(s);
      setClients(c.clients);
      setStats(st);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
      router.navigate({ to: "/" });
      return;
    }
    loadData();
  }, [isLoaded, user]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, loadData]);

  // Guard: not admin
  if (isLoaded && user?.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return null;
  }

  const notifications = getNotifications(status);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
                // Admin
              </div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                System overview and client management
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="accent-magenta"
                />
                Auto-refresh
              </label>
              <button
                onClick={() => { setLoading(true); loadData(); }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:border-magenta hover:text-magenta"
                disabled={loading}
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
              <AlertTriangle size={16} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Loading */}
          {loading && !status && (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <RefreshCw size={16} className="animate-spin" />
                Loading dashboard...
              </div>
            </div>
          )}

          {/* Stats overview */}
          {stats && (
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatCard
                icon={<Users size={18} />}
                label="Total Users"
                value={stats.total_users}
              />
              <StatCard
                icon={<MessageSquare size={18} />}
                label="Conversations"
                value={stats.total_conversations}
              />
              <StatCard
                icon={<Activity size={18} />}
                label="Messages"
                value={stats.total_messages}
              />
              <StatCard
                icon={<HardDrive size={18} />}
                label="Data Usage"
                value={status?.disk_usage_conversations || "—"}
              />
            </div>
          )}

          {/* Server Status */}
          {status && (
            <div className="mb-8">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Server size={18} className="text-magenta" />
                Server Status
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Object.entries(status.external_servers).map(([key, data]) => (
                  <ServerCard key={key} name={key} data={data} />
                ))}
              </div>

              {/* Local services */}
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Wifi size={16} className="text-muted-foreground" />
                      <h3 className="text-sm font-semibold text-foreground">Web App</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusDot status={status.services.web_app} />
                      <span className={`text-xs font-mono ${
                        status.services.web_app ? "text-green-500" : "text-red-500"
                      }`}>
                        {status.services.web_app ? "Running" : "Stopped"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Node.js (port 3000) · Caddy reverse proxy</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Wifi size={16} className="text-muted-foreground" />
                      <h3 className="text-sm font-semibold text-foreground">API Server</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusDot status={status.services.api} />
                      <span className={`text-xs font-mono ${
                        status.services.api ? "text-green-500" : "text-red-500"
                      }`}>
                        {status.services.api ? "Running" : "Stopped"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Python (port 8645) · Conversation store</p>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <AlertTriangle size={18} className="text-magenta" />
                Notifications
              </h2>
              <div className="space-y-2">
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${
                      n.type === "error"
                        ? "border-red-500/30 bg-red-500/10"
                        : n.type === "warning"
                          ? "border-yellow-500/30 bg-yellow-500/10"
                          : "border-blue-500/30 bg-blue-500/10"
                    }`}
                  >
                    <span className={`mt-0.5 shrink-0 ${
                      n.type === "error" ? "text-red-500" : n.type === "warning" ? "text-yellow-500" : "text-blue-500"
                    }`}>
                      {n.type === "info" ? "ℹ️" : "⚠️"}
                    </span>
                    <p className={`text-sm ${
                      n.type === "error" ? "text-red-500" : "text-muted-foreground"
                    }`}>
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clients */}
          {clients.length > 0 && (
            <div>
              <button
                onClick={() => setShowClients(!showClients)}
                className="mb-4 flex w-full items-center justify-between"
              >
                <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Users size={18} className="text-magenta" />
                  Clients
                  <span className="rounded-full bg-magenta/10 px-2 py-0.5 text-xs font-mono text-magenta">
                    {clients.length}
                  </span>
                </h2>
                {showClients ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
              </button>

              {showClients && (
                <div className="space-y-2">
                  {clients.map((client) => (
                    <ClientRow key={client.email} client={client} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {!loading && !status && !error && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Server size={48} className="mb-4 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No data available yet</p>
              <button
                onClick={() => { setLoading(true); loadData(); }}
                className="mt-4 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:border-magenta hover:text-magenta"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}