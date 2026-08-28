"use client";

import { useEffect, useState } from "react";

type Notice = {
  _id: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  important?: boolean;
};

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/notices", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }

        const data = await response.json();

        console.log("PUBLIC NOTICES API:", data);

        if (data && Array.isArray(data.notices)) {
          setNotices(data.notices);
        } else if (Array.isArray(data)) {
          setNotices(data);
        } else {
          setNotices([]);
        }
      } catch (error) {
        console.error("Failed to load notices:", error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-red-900">
            Prabhu Trade Union
          </p>

          <h1 className="font-serif text-4xl font-medium text-[#171717] md:text-6xl">
            Union Notices
          </h1>

          <p className="mt-5 text-base leading-7 text-gray-500 md:text-lg">
            Stay informed about union announcements, meetings,
            welfare activities, and important updates.
          </p>
        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-red-900" />

            <p className="text-gray-500">
              Loading notices...
            </p>
          </div>
        )}

        {/* =====================================================
            EMPTY
        ===================================================== */}

        {!loading && notices.length === 0 && (
          <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <div className="mb-5 text-4xl">
              📢
            </div>

            <h2 className="font-serif text-2xl text-[#171717]">
              No notices available
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              There are currently no published union notices.
              Please check back later for new announcements
              and updates.
            </p>
          </div>
        )}

        {/* =====================================================
            NOTICES
        ===================================================== */}

        {!loading && notices.length > 0 && (
          <div className="space-y-0">

            {notices.map((notice) => (
              <article
                key={notice._id}
                className="
                  group
                  border-t
                  border-gray-300
                  py-10
                  transition-all
                  duration-300
                  md:py-12
                "
              >
                <div className="grid gap-8 md:grid-cols-[220px_1fr]">

                  {/* =================================================
                      DATE / CATEGORY
                  ================================================= */}

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      {new Date(
                        notice.date
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>

                    {notice.category && (
                      <span className="
                        mt-4
                        inline-flex
                        rounded-full
                        bg-gray-100
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-gray-600
                      ">
                        {notice.category}
                      </span>
                    )}

                    {notice.important && (
                      <span className="
                        mt-2
                        inline-flex
                        rounded-full
                        bg-red-100
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-red-900
                      ">
                        Important
                      </span>
                    )}
                  </div>

                  {/* =================================================
                      NOTICE CONTENT
                  ================================================= */}

                  <div className="max-w-3xl">

                    <h2 className="
                      font-serif
                      text-2xl
                      leading-tight
                      text-red-900
                      transition-colors
                      duration-300
                      group-hover:text-red-800
                      md:text-3xl
                    ">
                      {notice.title}
                    </h2>

                    <p className="
                      mt-5
                      text-base
                      leading-8
                      text-gray-600
                      md:text-lg
                    ">
                      {notice.description}
                    </p>

                  </div>

                </div>
              </article>
            ))}

            <div className="border-t border-gray-300" />

          </div>
        )}

      </div>
    </main>
  );
}