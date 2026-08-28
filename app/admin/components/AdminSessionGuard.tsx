"use client";

import { useEffect, useRef } from "react";
import { signOut } from "next-auth/react";

const TAB_SESSION_KEY = "prabhu-admin-session";

export default function AdminTabSessionGuard() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;

    const existingTabSession =
      sessionStorage.getItem(TAB_SESSION_KEY);

    /*
     * If this tab does not have an active
     * admin session marker, force logout.
     *
     * This happens when the admin opens
     * the dashboard in a fresh browser tab.
     */
    if (!existingTabSession) {
      signOut({
        callbackUrl: "/admin/login",
      });

      return;
    }
  }, []);

  return null;
}