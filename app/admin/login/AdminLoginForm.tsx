"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const SESSION_KEY = "prabhu-admin-session";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl =
    searchParams.get("callbackUrl") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /*
     * If this tab already has an active admin session,
     * go directly to the dashboard.
     *
     * sessionStorage belongs ONLY to this browser tab.
     * When the tab is closed, it is removed.
     */
    const activeSession =
      sessionStorage.getItem(SESSION_KEY);

    if (activeSession === "active") {
      router.replace("/admin");
    }
  }, [router]);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("Invalid username or password.");
        setLoading(false);
        return;
      }

      /*
       * This is the important part.
       *
       * sessionStorage exists only for this browser tab.
       * Closing the tab removes this value automatically.
       */
      sessionStorage.setItem(
        SESSION_KEY,
        "active"
      );

      router.replace(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Something went wrong while signing in."
      );

      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">

          {/* LOGO */}

          <div className="mb-8 text-center">

            <div
              className="
                mx-auto
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-slate-900
                text-xl
                font-bold
                text-white
              "
            >
              PTU
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Prabhu Trade Union Administration
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* USERNAME */}

            <div>

              <label
                htmlFor="username"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
                autoComplete="username"
                placeholder="Enter username"
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  px-4
                  py-3
                  text-slate-900
                  outline-none
                  focus:border-slate-900
                  focus:ring-2
                  focus:ring-slate-200
                "
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                autoComplete="current-password"
                placeholder="Enter password"
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  px-4
                  py-3
                  text-slate-900
                  outline-none
                  focus:border-slate-900
                  focus:ring-2
                  focus:ring-slate-200
                "
              />

            </div>

            {/* ERROR */}

            {error && (
              <div
                className="
                  rounded-lg
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  text-red-700
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
                rounded-lg
                bg-slate-900
                px-4
                py-3
                font-semibold
                text-white
                transition
                hover:bg-slate-800
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>

          {/* BACK */}

          <div className="mt-6 text-center">

            <a
              href="/"
              className="
                text-sm
                text-slate-500
                transition
                hover:text-slate-900
              "
            >
              ← Back to Website
            </a>

          </div>

        </div>

      </div>
    </main>
  );
}