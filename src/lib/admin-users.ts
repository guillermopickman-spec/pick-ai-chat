import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";

const ADMIN_EMAIL = "pickaichat@gmail.com";

interface ClerkUser {
  id: string;
  email: string;
  created_at: number;
  last_sign_in_at: number | null;
}

async function getClerkUsers(): Promise<ClerkUser[]> {
  const secret = process.env.CLERK_SECRET_KEY;
  if (!secret) return [];
  const users: ClerkUser[] = [];
  let offset = 0;
  const limit = 100;
  // Paginate through all users.
  for (;;) {
    const res = await fetch(
      `https://api.clerk.com/v1/users?limit=${limit}&offset=${offset}`,
      { headers: { Authorization: `Bearer ${secret}` } },
    );
    if (!res.ok) break;
    const data = await res.json();
    const batch = data as any[];
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const u of batch) {
      const email = u.email_addresses?.[0]?.email_address ?? "";
      if (!email) continue;
      users.push({
        id: u.id,
        email,
        created_at: u.created_at ?? 0,
        last_sign_in_at: u.last_sign_in_at ?? null,
      });
    }
    if (batch.length < limit) break;
    offset += limit;
  }
  return users;
}

export const listClerkUsers = createServerFn({ method: "GET" }).handler(
  async () => {
    const { userId, sessionClaims } = await auth();
    const email = sessionClaims?.email as string | undefined;
    if (!userId || email !== ADMIN_EMAIL) {
      throw new Error("Unauthorized");
    }
    const users = await getClerkUsers();
    // Sort: admins first, then by last sign-in desc.
    const isAdmin = (e: string) => e === ADMIN_EMAIL || e === "guillermopickman@gmail.com";
    return users.sort((a, b) => {
      const aa = isAdmin(a.email) ? 1 : 0;
      const bb = isAdmin(b.email) ? 1 : 0;
      if (aa !== bb) return bb - aa;
      return (b.last_sign_in_at ?? 0) - (a.last_sign_in_at ?? 0);
    });
  },
);
