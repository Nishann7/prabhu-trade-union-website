"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const TAB_SESSION_KEY = "prabhu-admin-session";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password.");
      setLoading(false);
      return;
    }

    /*
     * Mark this browser tab as an active
     * Prabhu Union admin session.
     *
     * sessionStorage belongs only to this tab.
     * It survives refreshes but is removed
     * when the tab is closed.
     */
    sessionStorage.setItem(
      TAB_SESSION_KEY,
      "active"
    );

    /*
     * Go to the admin dashboard after
     * successful authentication.
     */
    window.location.href = "/admin";
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* HEADER */}

        <div className="text-center mb-10">

          <div
            className="
              mx-auto
              w-14
              h-14
              rounded-full
              border
              border-yellow-500/50
              flex
              items-center
              justify-center
              text-yellow-400
              text-xl
              font-serif
              mb-5
            "
          >
            P
          </div>

          <p
            className="
              text-yellow-500
              text-xs
              font-semibold
              tracking-[0.3em]
              uppercase
            "
          >
            Prabhu Union
          </p>

          <h1 className="text-3xl font-serif mt-3">
            Admin Login
          </h1>

          <p className="text-gray-500 text-sm mt-3">
            Sign in to access the administration panel.
          </p>

        </div>

        {/* LOGIN FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            p-8
            space-y-6
          "
        >

          {/* USERNAME */}

          <div>

            <label
              htmlFor="username"
              className="
                block
                text-xs
                uppercase
                tracking-widest
                text-gray-500
                mb-2
              "
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
              autoComplete="username"
              placeholder="Enter username"
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                text-white
                outline-none
                placeholder:text-gray-700
                focus:border-yellow-500/50
                focus:ring-1
                focus:ring-yellow-500/20
              "
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label
              htmlFor="password"
              className="
                block
                text-xs
                uppercase
                tracking-widest
                text-gray-500
                mb-2
              "
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              autoComplete="current-password"
              placeholder="Enter password"
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                text-white
                outline-none
                placeholder:text-gray-700
                focus:border-yellow-500/50
                focus:ring-1
                focus:ring-yellow-500/20
              "
            />

          </div>

          {/* ERROR */}

          {error && (
            <div
              className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/5
                px-4
                py-3
                text-sm
                text-red-400
              "
            >
              {error}
            </div>
          )}

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-yellow-500
              px-4
              py-3
              font-semibold
              text-black
              transition
              hover:bg-yellow-400
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

        {/* FOOTER */}

        <div className="mt-6 text-center">

          <a
            href="/"
            className="
              text-sm
              text-gray-600
              transition
              hover:text-yellow-500
            "
          >
            ← Back to website
          </a>

        </div>

      </div>

    </main>
  );
}
