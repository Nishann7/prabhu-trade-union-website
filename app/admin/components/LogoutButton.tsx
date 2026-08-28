"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="
        rounded-full
        border border-red-500/20
        bg-red-500/5
        px-5 py-2.5
        text-sm font-medium
        text-red-400
        transition-all duration-300
        hover:border-red-500/40
        hover:bg-red-500/10
        hover:text-red-300
      "
    >
      Logout
    </button>
  );
}