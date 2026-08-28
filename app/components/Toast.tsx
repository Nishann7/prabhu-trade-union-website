"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className="
        fixed
        right-6
        top-6
        z-[9999]
        w-[calc(100%-3rem)]
        max-w-md
        animate-[toast-in_0.4s_ease-out]
      "
    >
      <div
        className={`
          flex
          items-start
          gap-4
          rounded-2xl
          border
          bg-white
          px-5
          py-4
          shadow-[0_20px_50px_rgba(0,0,0,0.12)]
          ${
            isSuccess
              ? "border-green-100"
              : "border-red-100"
          }
        `}
      >
        {/* ICON */}
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            ${
              isSuccess
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {isSuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12l4 4L19 6"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86l-7.82 13a2 2 0 001.71 3h15.64a2 2 0 001.71-3l-7.82-13a2 2 0 00-3.42 0z"
              />
            </svg>
          )}
        </div>

        {/* MESSAGE */}
        <div className="min-w-0 flex-1 pt-0.5">
          <p
            className={`
              text-sm
              font-semibold
              ${
                isSuccess
                  ? "text-green-900"
                  : "text-red-900"
              }
            `}
          >
            {isSuccess
              ? "Success"
              : "Something went wrong"}
          </p>

          <p className="mt-1 text-sm leading-5 text-gray-600">
            {message}
          </p>
        </div>

        {/* CLOSE */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            text-gray-400
            transition-colors
            hover:bg-gray-100
            hover:text-gray-700
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}