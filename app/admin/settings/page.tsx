"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Save, Settings as SettingsIcon } from "lucide-react";
import Toast from "../components/Toast";

type Settings = {
  _id?: string;
  unionName: string;
  address: string;
  phone: string;
  email: string;
};

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    unionName: "Prabhu Union",
    address: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  // =========================
  // TOAST
  // =========================

  const showToast = (
    type: "success" | "error",
    message: string
  ) => {
    setToast({
      type,
      message,
    });

    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // =========================
  // GET SETTINGS
  // =========================

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/settings", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to fetch settings"
          );
        }

        if (data.settings) {
          setSettings({
            unionName: data.settings.unionName || "",
            address: data.settings.address || "",
            phone: data.settings.phone || "",
            email: data.settings.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);

        showToast(
          "error",
          error instanceof Error
            ? error.message
            : "Failed to load settings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (
    field: keyof Settings,
    value: string
  ) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =========================
  // SAVE SETTINGS
  // =========================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    if (!settings.unionName.trim()) {
      showToast(
        "error",
        "Union name is required."
      );
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to save settings"
        );
      }

      if (data.settings) {
        setSettings({
          unionName: data.settings.unionName || "",
          address: data.settings.address || "",
          phone: data.settings.phone || "",
          email: data.settings.email || "",
        });
      }

      showToast(
        "success",
        "Website settings saved successfully."
      );
    } catch (error) {
      console.error(
        "Error saving settings:",
        error
      );

      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to save settings."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] px-6 py-12 md:px-8">

        <div className="mx-auto max-w-4xl">

          <div className="animate-pulse space-y-6">

            <div className="h-4 w-40 rounded bg-gray-200" />

            <div className="h-12 w-80 rounded bg-gray-200" />

            <div className="h-4 max-w-xl rounded bg-gray-200" />

            <div className="mt-10 h-[500px] rounded-[2rem] bg-gray-200" />

          </div>

        </div>

      </main>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 py-12 md:px-8">

      {/* TOAST */}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="mx-auto max-w-4xl">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-12">

          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-red-900">
            Prabhu Union
          </p>

          <h1 className="font-serif text-4xl font-medium text-[#171717] md:text-5xl">
            Website Settings
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-gray-500">
            Manage the basic information displayed
            throughout the Prabhu Union website.
          </p>

        </div>

        {/* =========================
            SETTINGS CARD
        ========================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/80
            bg-white/60
            p-8
            shadow-[0_20px_60px_rgba(0,0,0,0.07)]
            backdrop-blur-2xl
            md:p-10
          "
        >

          {/* GLASS DECORATION */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-red-100/50
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-20
              h-56
              w-56
              rounded-full
              bg-gray-200/50
              blur-3xl
            "
          />

          <div className="relative">

            {/* CARD HEADER */}

            <div className="mb-10 flex items-start gap-4">

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-red-900
                  text-white
                  shadow-lg
                "
              >
                <SettingsIcon className="h-5 w-5" />
              </div>

              <div>

                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                  Configuration
                </p>

                <h2 className="mt-2 font-serif text-3xl text-[#171717]">
                  General Information
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  These details can be displayed across
                  your public website.
                </p>

              </div>

            </div>

            {/* =========================
                FORM
            ========================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

              {/* UNION NAME */}

              <div>

                <label
                  htmlFor="union-name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                  "
                >
                  Union Name
                </label>

                <input
                  id="union-name"
                  type="text"
                  value={settings.unionName}
                  onChange={(e) =>
                    handleChange(
                      "unionName",
                      e.target.value
                    )
                  }
                  disabled={saving}
                  placeholder="Prabhu Union"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-black/10
                    bg-white/70
                    px-4
                    py-3.5
                    text-gray-800
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-gray-400
                    focus:border-red-900
                    focus:bg-white
                    focus:ring-4
                    focus:ring-red-900/10
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />

              </div>

              {/* ADDRESS */}

              <div>

                <label
                  htmlFor="address"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                  "
                >
                  Address
                </label>

                <input
                  id="address"
                  type="text"
                  value={settings.address}
                  onChange={(e) =>
                    handleChange(
                      "address",
                      e.target.value
                    )
                  }
                  disabled={saving}
                  placeholder="Enter office address"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-black/10
                    bg-white/70
                    px-4
                    py-3.5
                    text-gray-800
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-gray-400
                    focus:border-red-900
                    focus:bg-white
                    focus:ring-4
                    focus:ring-red-900/10
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />

              </div>

              {/* PHONE */}

              <div>

                <label
                  htmlFor="phone"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                  "
                >
                  Phone
                </label>

                <input
                  id="phone"
                  type="text"
                  value={settings.phone}
                  onChange={(e) =>
                    handleChange(
                      "phone",
                      e.target.value
                    )
                  }
                  disabled={saving}
                  placeholder="+977-XXXXXXXXXX"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-black/10
                    bg-white/70
                    px-4
                    py-3.5
                    text-gray-800
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-gray-400
                    focus:border-red-900
                    focus:bg-white
                    focus:ring-4
                    focus:ring-red-900/10
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />

              </div>

              {/* EMAIL */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                  "
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    handleChange(
                      "email",
                      e.target.value
                    )
                  }
                  disabled={saving}
                  placeholder="info@example.com"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-black/10
                    bg-white/70
                    px-4
                    py-3.5
                    text-gray-800
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-gray-400
                    focus:border-red-900
                    focus:bg-white
                    focus:ring-4
                    focus:ring-red-900/10
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />

              </div>

              {/* DIVIDER */}

              <div className="border-t border-black/5 pt-7">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-2 text-sm text-gray-500">

                    <CheckCircle2 className="h-4 w-4 text-green-600" />

                    <span>
                      Changes are saved to the website.
                    </span>

                  </div>

                  {/* SAVE BUTTON */}

                  <button
                    type="submit"
                    disabled={saving}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-red-900
                      px-7
                      py-3
                      font-semibold
                      text-white
                      shadow-lg
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-red-800
                      hover:shadow-xl
                      active:scale-95
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      disabled:hover:translate-y-0
                    "
                  >

                    <Save className="h-4 w-4" />

                    {saving
                      ? "Saving..."
                      : "Save Settings"}

                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

      </div>

    </main>
  );
}
