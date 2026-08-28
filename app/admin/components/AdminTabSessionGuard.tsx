"use client";

import { useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const TAB_SESSION_KEY = "prabhu-admin-session";

export default function AdminTabSessionGuard() {
  const initialized = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    // Avoid running session guard on the login page itself
    if (pathname === "/admin/login") return;

    if (initialized.current) return;
    initialized.current = true;

    const existingTabSession =
      sessionStorage.getItem(TAB_SESSION_KEY);

    /*
     * A new browser tab has no sessionStorage
     * marker, even if the NextAuth cookie exists.
     *
     * Therefore force the admin to log in again.
     */
    if (!existingTabSession) {
      signOut({
        callbackUrl: "/admin/login",
      });

      return;
    }
  }, [pathname]);

  return null;
}
