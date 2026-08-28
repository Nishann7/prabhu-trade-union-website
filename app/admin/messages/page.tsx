"use client";

import { useEffect, useState } from "react";

type Message = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  status?: "pending" | "resolved";
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingReadId, setUpdatingReadId] = useState<string | null>(
    null
  );

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to fetch messages"
        );
      }

      setMessages(data.messages || []);
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // =========================
  // TOGGLE RESOLVED / PENDING
  // =========================

  const handleToggleStatus = async (
    id: string,
    currentStatus?: "pending" | "resolved"
  ) => {
    const newStatus =
      currentStatus === "resolved"
        ? "pending"
        : "resolved";

    try {
      const response = await fetch("/api/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to update grievance status"
        );
      }

      await fetchMessages();
    } catch (error) {
      console.error("Status toggle error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update grievance status"
      );
    }
  };

  // =========================
  // TOGGLE READ / UNREAD
  // =========================

  const handleToggleRead = async (
    id: string,
    currentRead: boolean
  ) => {
    try {
      setUpdatingReadId(id);

      const response = await fetch("/api/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          read: !currentRead,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to update message"
        );
      }

      await fetchMessages();
    } catch (error) {
      console.error("Read status error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update message"
      );
    } finally {
      setUpdatingReadId(null);
    }
  };

  // =========================
  // DELETE MESSAGE
  // =========================

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const response = await fetch("/api/contact", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: deleteId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to delete message"
        );
      }

      setDeleteId(null);

      await fetchMessages();
    } catch (error) {
      console.error("Delete message error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete message"
      );
    } finally {
      setDeleting(false);
    }
  };

  // =========================
  // COUNTS
  // =========================

  const unreadCount = messages.filter(
    (message) => !message.read
  ).length;

  const pendingCount = messages.filter(
    (message) =>
      message.status !== "resolved"
  ).length;

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 md:px-8 py-12">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <p className="text-sm tracking-[0.28em] uppercase text-red-900 mb-4">
            Prabhu Trade Union
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <div>

              <h1 className="text-4xl md:text-5xl font-serif text-[#171717]">
                Grievances & Messages
              </h1>

              <p className="text-gray-500 mt-4 max-w-xl">
                View grievances and contact messages
                submitted by union members and website
                visitors.
              </p>

            </div>

            {/* SUMMARY */}

            <div className="flex gap-3">

              <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Total
                </p>

                <p className="text-2xl font-semibold text-[#171717] mt-1">
                  {messages.length}
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-2xl px-5 py-4">
                <p className="text-xs uppercase tracking-wider text-orange-600">
                  Unread
                </p>

                <p className="text-2xl font-semibold text-orange-700 mt-1">
                  {unreadCount}
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
                <p className="text-xs uppercase tracking-wider text-green-600">
                  Pending
                </p>

                <p className="text-2xl font-semibold text-green-700 mt-1">
                  {pendingCount}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="py-12 text-center text-gray-500">
            Loading grievances...
          </div>
        )}

        {/* EMPTY */}

        {!loading && messages.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <p className="text-gray-500">
              No grievances or messages have been
              received yet.
            </p>
          </div>
        )}

        {/* MESSAGES */}

        {!loading && messages.length > 0 && (
          <div className="space-y-6">

            {messages.map((message) => (

              <article
                key={message._id}
                className={`bg-white rounded-3xl border p-6 md:p-8 shadow-sm transition ${
                  message.read
                    ? "border-gray-200"
                    : "border-orange-200 ring-1 ring-orange-100"
                }`}
              >

                {/* MESSAGE HEADER */}

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-2xl font-serif text-red-900">
                        {message.name}
                      </h2>

                      {/* READ BADGE */}

                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${
                          message.read
                            ? "bg-gray-100 text-gray-500 border border-gray-200"
                            : "bg-orange-50 text-orange-700 border border-orange-200"
                        }`}
                      >
                        {message.read
                          ? "Read"
                          : "Unread"}
                      </span>

                      {/* STATUS BADGE */}

                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${
                          message.status ===
                          "resolved"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-orange-50 text-orange-700 border border-orange-200"
                        }`}
                      >
                        {message.status ===
                        "resolved"
                          ? "Resolved"
                          : "Pending"}
                      </span>

                    </div>

                    <div className="mt-3 space-y-1 text-sm text-gray-500">

                      <p>
                        Email:{" "}
                        <span className="text-gray-700">
                          {message.email}
                        </span>
                      </p>

                      {message.phone && (
                        <p>
                          Phone:{" "}
                          <span className="text-gray-700">
                            {message.phone}
                          </span>
                        </p>
                      )}

                    </div>

                  </div>

                  <p className="text-xs text-gray-400">
                    {new Date(
                      message.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                </div>

                {/* MESSAGE */}

                <div className="mt-6 border-t border-gray-100 pt-6">

                  <p className="text-gray-600 leading-7 whitespace-pre-wrap">
                    {message.message}
                  </p>

                </div>

                {/* ACTIONS */}

                <div className="mt-6 flex flex-wrap gap-3">

                  {/* READ */}

                  <button
                    type="button"
                    disabled={
                      updatingReadId ===
                      message._id
                    }
                    onClick={() =>
                      handleToggleRead(
                        message._id,
                        message.read
                      )
                    }
                    className={`px-5 py-2 rounded-full border text-sm font-medium transition disabled:opacity-50 ${
                      message.read
                        ? "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                        : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {updatingReadId ===
                    message._id
                      ? "Updating..."
                      : message.read
                      ? "Mark as Unread"
                      : "Mark as Read"}
                  </button>

                  {/* RESOLVE */}

                  <button
                    type="button"
                    onClick={() =>
                      handleToggleStatus(
                        message._id,
                        message.status
                      )
                    }
                    className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                      message.status ===
                      "resolved"
                        ? "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                        : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {message.status ===
                    "resolved"
                      ? "Mark as Pending"
                      : "Mark as Resolved"}
                  </button>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      setDeleteId(
                        message._id
                      )
                    }
                    className="px-5 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:text-red-700 hover:border-red-200 hover:bg-red-50 transition"
                  >
                    Delete Grievance
                  </button>

                </div>

              </article>

            ))}

          </div>
        )}

      </div>

      {/* DELETE MODAL */}

      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          onClick={() => {
            if (!deleting) {
              setDeleteId(null);
            }
          }}
        >

          <div
            className="w-full max-w-md rounded-3xl bg-[#f7f5f0] p-8 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="mb-6">

              <p className="text-xs tracking-[0.25em] uppercase text-red-900 mb-3">
                Prabhu Trade Union
              </p>

              <h2 className="text-2xl font-serif text-[#171717]">
                Delete Grievance?
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Are you sure you want to permanently
                delete this grievance? This action
                cannot be undone.
              </p>

            </div>

            <div className="flex justify-end gap-3">

              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  setDeleteId(null)
                }
                className="px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-full bg-red-900 text-white text-sm font-medium hover:bg-red-800 transition disabled:opacity-50"
              >
                {deleting
                  ? "Deleting..."
                  : "Delete Grievance"}
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}