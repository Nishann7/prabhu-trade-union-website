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
      console.error(
        "Failed to load messages:",
        error
      );

      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus?: "pending" | "resolved") => {
    const newStatus = currentStatus === "resolved" ? "pending" : "resolved";

    try {
      const response = await fetch("/api/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update grievance status"
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

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this grievance message?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch("/api/contact", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete message"
        );
      }

      await fetchMessages();
    } catch (error) {
      console.error(
        "Delete message error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete message"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 md:px-8 py-12">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <p className="text-sm tracking-[0.28em] uppercase text-red-900 mb-4">
            Prabhu Trade Union
          </p>

          <h1 className="text-4xl md:text-5xl font-serif text-[#171717]">
            Grievances & Messages
          </h1>

          <p className="text-gray-500 mt-4 max-w-xl">
            View grievances and contact messages submitted by union members and website visitors.
          </p>

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
              No grievances or messages have been received yet.
            </p>
          </div>
        )}

        {/* MESSAGES */}

        {!loading && messages.length > 0 && (
          <div className="space-y-6">

            {messages.map((message) => (

              <article
                key={message._id}
                className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm"
              >

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

                  <div>

                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-serif text-red-900">
                        {message.name}
                      </h2>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${
                          message.status === "resolved"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-orange-50 text-orange-700 border border-orange-200"
                        }`}
                      >
                        {message.status === "resolved" ? "Resolved" : "Pending"}
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

                <div className="mt-6 border-t border-gray-100 pt-6">

                  <p className="text-gray-600 leading-7 whitespace-pre-wrap">
                    {message.message}
                  </p>

                </div>

                <div className="mt-6 flex flex-wrap gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      handleToggleStatus(message._id, message.status)
                    }
                    className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                      message.status === "resolved"
                        ? "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                        : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {message.status === "resolved" ? "Mark as Pending" : "Mark as Resolved"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(message._id)
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

    </main>
  );
}