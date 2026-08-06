import { isAdminEmail } from "@/utils/api";

/**
 * WIP / internal feature gates.
 *
 * WIP features are not ready for public/free/normal users yet — they are only
 * shown to admins (Guille). To make a feature WIP-gated, add its flag here and
 * consume `canAccessWip` in the Navbar / route guard.
 *
 * Usage of user emails / plan metadata mirrors the existing client-side auth
 * pattern in Navbar.tsx.
 */

export interface WipUser {
  emails: string[];
  plan?: unknown; // publicMetadata.plan
  isAdmin?: boolean;
}

/** True if the given signed-in user may use WIP/experimental features. */
export function canAccessWip(user: WipUser): boolean {
  if (user?.isAdmin) return true;
  return !!user && (user.emails ?? []).some((e) => isAdminEmail(e));
}
