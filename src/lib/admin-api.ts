import { createServerFn } from "@tanstack/react-start";

const API_BASE = process.env.ADMIN_API_URL || "https://mail.pickaichat.com";
const API_KEY = process.env.ADMIN_API_KEY || "pickai-admin-2026";

export interface ServerStatus {
  server: {
    hostname: string;
    uptime_since: string;
  };
  external_servers: Record<string, {
    label: string;
    status: "online" | "offline" | "error";
    latency: string | null;
    error?: string;
  }>;
  services: {
    web_app: boolean | null;
    api: boolean | null;
  };
  disk_usage_conversations: string;
  stats: {
    total_users: number;
    total_conversations: number;
    total_messages: number;
  };
}

export interface Client {
  email: string;
  conversations: number;
  total_messages: number;
  last_active: number;
}

export interface ClientsResponse {
  clients: Client[];
}

export interface StatsResponse {
  total_users: number;
  total_conversations: number;
  total_messages: number;
  per_user: { email: string; conversations: number; messages: number }[];
}

async function adminFetch(path: string): Promise<any> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Admin API error (${res.status}): ${text}`);
  }
  return res.json();
}

export const fetchAdminStatus = createServerFn({ method: "GET" })
  .handler(async () => {
    const data = await adminFetch("/api/admin/status");
    return data as ServerStatus;
  });

export const fetchAdminClients = createServerFn({ method: "GET" })
  .handler(async () => {
    const data = await adminFetch("/api/admin/clients");
    return data as ClientsResponse;
  });

export const fetchAdminStats = createServerFn({ method: "GET" })
  .handler(async () => {
    const data = await adminFetch("/api/admin/stats");
    return data as StatsResponse;
  });