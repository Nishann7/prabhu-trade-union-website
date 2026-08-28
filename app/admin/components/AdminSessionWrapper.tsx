"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const TAB_SESSION_KEY = "prabhu-admin-session";

export default function AdminSessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    const existingTabSession = sessionStorage.getItem(TAB_SESSION_KEY);

    if (!existingTabSession) {
      // Force logout and redirect
      signOut({
        callbackUrl: "/admin/login",
      });
    } else {
      setLoading(false);
    }
  }, [pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500">
            Verifying Session...
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
