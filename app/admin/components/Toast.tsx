"use client";

type ToastProps = {
  type: "success" | "error";
  message: string;
  onClose: () => void;
};

export default function Toast({
  type,
  message,
  onClose,
}: ToastProps) {
  return (
    <div
      className={`fixed right-6 top-6 z-[9999] flex min-w-[320px] items-center justify-between gap-4 rounded-xl border px-5 py-4 shadow-2xl backdrop-blur-xl ${
        type === "success"
          ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-100"
          : "border-red-500/30 bg-red-950/90 text-red-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            type === "success"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {type === "success" ? "✓" : "!"}
        </div>

        <span className="text-sm font-medium">{message}</span>
      </div>

      <button
        onClick={onClose}
        className="text-lg opacity-60 transition hover:opacity-100"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}