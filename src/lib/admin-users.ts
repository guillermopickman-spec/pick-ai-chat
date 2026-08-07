import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";

const ADMIN_EMAIL = "pickaichat@gmail.com";

/** All emails treated as admin (both your Google accounts). */
export const ADMIN_EMAILS = [ADMIN_EMAIL, "guillermopickman@gmail.com"];

/** True if the given email is an admin account. */
export function isAdminEmail(email: string | undefined | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email);
}

/**
 * Resolve the current user's real email addresses. Prefers the session email
 * claim, but falls back to fetching the user's email_addresses from Clerk when
 * the claim is absent (some Google/OAuth sessions don't populate
 * sessionClaims.email).
 */
export async function getUserEmails(
  userId: string | null,
  sessionEmail?: string | null,
): Promise<string[]> {
  const emails: string[] = [];
  if (sessionEmail) emails.push(sessionEmail);
  if (!userId) return emails;
  const secret = process.env.CLERK_SECRET_KEY;
  if (!secret) return emails;
  try {
    const res = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${secret}` },
    });
    if (res.ok) {
      const u = await res.json();
      (u.email_addresses ?? []).forEach((e: { email_address?: string }) => {
        if (e.email_address && !emails.includes(e.email_address)) {
          emails.push(e.email_address);
        }
      });
    }
  } catch {
    /* ignore */
  }
  return emails;
}

/**
 * Resolve whether the current Clerk session belongs to an admin.
 * Prefers the session email claim, but falls back to fetching the user's
 * email addresses from Clerk when the claim is absent.
 */
export async function assertAdmin(
  userId: string | null,
  sessionEmail?: string | null,
): Promise<boolean> {
  if (!userId) return false;
  const emails = await getUserEmails(userId, sessionEmail);
  return emails.some((e) => isAdminEmail(e));
}

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
    const ok = await assertAdmin(userId, sessionClaims?.email as string | undefined);
    if (!ok) {
      throw new Error("Unauthorized");
    }
    const users = await getClerkUsers();
    // Sort: admins first, then by last sign-in desc.
    const isAdmin = (e: string) => isAdminEmail(e);
    return users.sort((a, b) => {
      const aa = isAdmin(a.email) ? 1 : 0;
      const bb = isAdmin(b.email) ? 1 : 0;
      if (aa !== bb) return bb - aa;
      return (b.last_sign_in_at ?? 0) - (a.last_sign_in_at ?? 0);
    });
  },
);
