"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "./components/LogoutButton";

type Notice = {
  _id: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  important?: boolean;
};

type GalleryPhoto = {
  _id: string;
  title: string;
  imageUrl: string;
  createdAt?: string;
};

const cards = [
  {
    title: "Notices",
    description:
      "Create and manage union announcements and important updates.",
    icon: "📢",
    href: "/admin/notices",
    label: "Manage Notices",
  },
  {
    title: "Gallery",
    description:
      "Manage photos from meetings, programs, and union activities.",
    icon: "▣",
    href: "/admin/gallery",
    label: "Manage Gallery",
  },
  {
    title: "Grievances",
    description:
      "See submitted grievances, view details, and mark them resolved.",
    icon: "📩",
    href: "/admin/messages",
    label: "Manage Grievances",
  },
  {
    title: "Settings",
    description:
      "Update union information, contact details, and website settings.",
    icon: "⚙",
    href: "/admin/settings",
    label: "Open Settings",
  },
  {
    title: "Members",
    description:
      "View and manage union membership information.",
    icon: "♙",
    href: "#",
    label: "Coming Soon",
  },
];

export default function AdminDashboard() {
  const [noticeCount, setNoticeCount] =
    useState<number | null>(null);

  const [galleryCount, setGalleryCount] =
    useState<number | null>(null);

  const [grievanceCount, setGrievanceCount] =
    useState<number | null>(null);

  const [latestNotice, setLatestNotice] =
    useState<Notice | null>(null);

  const [latestGallery, setLatestGallery] =
    useState<GalleryPhoto | null>(null);

  const [activityLoading, setActivityLoading] =
    useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [
          noticesResponse,
          galleryResponse,
          contactResponse,
        ] = await Promise.all([
          fetch("/api/notices"),
          fetch("/api/gallery"),
          fetch("/api/contact"),
        ]);

        const noticesData =
          await noticesResponse.json();

        const galleryData =
          await galleryResponse.json();

        const contactData =
          await contactResponse.json();

        if (
          noticesResponse.ok &&
          noticesData.success
        ) {
          const notices =
            noticesData.notices || [];

          setNoticeCount(notices.length);

          if (notices.length > 0) {
            setLatestNotice(notices[0]);
          }
        }

        if (
          galleryResponse.ok &&
          galleryData.success
        ) {
          const photos =
            galleryData.photos || [];

          setGalleryCount(photos.length);

          if (photos.length > 0) {
            setLatestGallery(photos[0]);
          }
        }

        if (
          contactResponse.ok &&
          contactData.success
        ) {
          const messages =
            contactData.messages || [];
          setGrievanceCount(messages.length);
        }
      } catch (error) {
        console.error(
          "Failed to load dashboard data:",
          error
        );
      } finally {
        setActivityLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  function formatDate(date?: string) {
    if (!date) {
      return "Date unavailable";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#050505] text-white">

        {/* BACKGROUND */}

        <div className="fixed inset-0 pointer-events-none overflow-hidden">

          <div
            className="
              absolute
              top-[-200px]
              left-[-200px]
              w-[500px]
              h-[500px]
              bg-yellow-500/5
              rounded-full
              blur-3xl
            "
          />

          <div
            className="
              absolute
              bottom-[-200px]
              right-[-200px]
              w-[500px]
              h-[500px]
              bg-yellow-500/5
              rounded-full
              blur-3xl
            "
          />

        </div>

        <div className="relative">

          {/* HEADER */}

          <header
            className="
              border-b
              border-white/10
              bg-black/70
              backdrop-blur-xl
            "
          >

            <div
              className="
                max-w-7xl
                mx-auto
                px-6
                md:px-10
                py-5
              "
            >

              <div className="flex items-center justify-between">

                <Link
                  href="/admin"
                  className="group"
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-full
                        border
                        border-yellow-500/50
                        flex
                        items-center
                        justify-center
                        text-yellow-400
                        font-serif
                        text-lg
                      "
                    >
                      P
                    </div>

                    <div>

                      <p
                        className="
                          text-sm
                          font-semibold
                          tracking-[0.18em]
                          uppercase
                        "
                      >
                        Prabhu
                      </p>

                      <p
                        className="
                          text-[10px]
                          tracking-[0.28em]
                          uppercase
                          text-gray-500
                        "
                      >
                        Prabhu Union
                      </p>

                    </div>

                  </div>

                </Link>

                <div className="flex items-center gap-4">

                  <div className="hidden sm:block text-right">

                    <p
                      className="
                        text-xs
                        text-gray-500
                        uppercase
                        tracking-widest
                      "
                    >
                      Administration
                    </p>

                    <p className="text-sm text-gray-300">
                      Admin Panel
                    </p>

                  </div>

                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-white/5
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      text-yellow-400
                      font-medium
                    "
                  >
                    A
                  </div>

                  <LogoutButton />

                </div>

              </div>

            </div>

          </header>

          {/* CONTENT */}

          <section
            className="
              max-w-7xl
              mx-auto
              px-6
              md:px-10
              py-12
              md:py-16
            "
          >

            {/* TITLE */}

            <div className="mb-12">

              <p
                className="
                  text-yellow-500
                  text-xs
                  font-semibold
                  tracking-[0.35em]
                  uppercase
                  mb-4
                "
              >
                Control Center
              </p>

              <h1
                className="
                  text-4xl
                  md:text-6xl
                  font-serif
                  font-medium
                  tracking-tight
                "
              >
                Admin Dashboard
              </h1>

              <p
                className="
                  text-gray-500
                  mt-5
                  max-w-2xl
                  leading-relaxed
                "
              >
                Manage Prabhu Union&apos;s website,
                notices, gallery, members, and organizational
                information from one place.
              </p>

            </div>

            {/* STATISTICS */}

            <div
              className="
                grid
                grid-cols-2
                lg:grid-cols-4
                gap-4
                mb-12
              "
            >

              {/* MEMBERS */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
              >

                <p className="text-gray-500 text-xs uppercase tracking-widest">
                  Members
                </p>

                <p className="text-3xl font-semibold mt-3">
                  500+
                </p>

                <p className="text-xs text-yellow-500 mt-2">
                  Active members
                </p>

              </div>

              {/* NOTICES */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
              >

                <p className="text-gray-500 text-xs uppercase tracking-widest">
                  Notices
                </p>

                <p className="text-3xl font-semibold mt-3">
                  {noticeCount === null
                    ? "—"
                    : noticeCount}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Database records
                </p>

              </div>

              {/* GALLERY */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
              >

                <p className="text-gray-500 text-xs uppercase tracking-widest">
                  Gallery
                </p>

                <p className="text-3xl font-semibold mt-3">
                  {galleryCount === null
                    ? "—"
                    : galleryCount}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Uploaded images
                </p>

              </div>

              {/* GRIEVANCES */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
              >

                <p className="text-gray-500 text-xs uppercase tracking-widest">
                  Grievances
                </p>

                <p className="text-3xl font-semibold mt-3 text-red-400">
                  {grievanceCount === null
                    ? "—"
                    : grievanceCount}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Submitted messages
                </p>

              </div>

            </div>

            {/* RECENT ACTIVITY */}

            <section className="mb-14">

              <div className="mb-6">

                <p
                  className="
                    text-yellow-500
                    text-xs
                    uppercase
                    tracking-[0.3em]
                  "
                >
                  Recent Activity
                </p>

                <h2 className="text-2xl md:text-3xl font-serif mt-2">
                  Latest Updates
                </h2>

              </div>

              <div className="grid lg:grid-cols-2 gap-5">

                {/* NOTICE */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-7
                  "
                >

                  <p
                    className="
                      text-yellow-500
                      text-xs
                      uppercase
                      tracking-[0.25em]
                      mb-3
                    "
                  >
                    Latest Notice
                  </p>

                  <h3 className="text-xl font-serif">

                    {activityLoading
                      ? "Loading..."
                      : latestNotice
                        ? latestNotice.title
                        : "No notices yet"}

                  </h3>

                  {latestNotice && (
                    <>

                      <p
                        className="
                          text-gray-500
                          text-sm
                          mt-4
                          leading-relaxed
                          line-clamp-2
                        "
                      >
                        {latestNotice.description}
                      </p>

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          mt-6
                          pt-5
                          border-t
                          border-white/10
                        "
                      >

                        <p className="text-xs text-gray-600">
                          {formatDate(
                            latestNotice.date
                          )}
                        </p>

                        <Link
                          href="/admin/notices"
                          className="
                            text-xs
                            text-gray-400
                            hover:text-yellow-400
                          "
                        >
                          View Notices →
                        </Link>

                      </div>

                    </>
                  )}

                  {!activityLoading &&
                    !latestNotice && (
                      <Link
                        href="/admin/notices"
                        className="
                          inline-block
                          mt-5
                          text-sm
                          text-yellow-500
                        "
                      >
                        Create First Notice →
                      </Link>
                    )}

                </div>

                {/* GALLERY */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    overflow-hidden
                  "
                >

                  <div className="p-7">

                    <p
                      className="
                        text-yellow-500
                        text-xs
                        uppercase
                        tracking-[0.25em]
                        mb-3
                      "
                    >
                      Latest Gallery
                    </p>

                    <h3 className="text-xl font-serif">

                      {activityLoading
                        ? "Loading..."
                        : latestGallery
                          ? latestGallery.title
                          : "No gallery images yet"}

                    </h3>

                  </div>

                  {latestGallery && (
                    <>

                      <div
                        className="
                          mx-7
                          aspect-[16/8]
                          rounded-2xl
                          overflow-hidden
                          border
                          border-white/10
                        "
                      >

                        <img
                          src={latestGallery.imageUrl}
                          alt={latestGallery.title}
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />

                      </div>

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          mx-7
                          mt-5
                          pb-7
                          pt-5
                          border-t
                          border-white/10
                        "
                      >

                        <p className="text-xs text-gray-600">
                          {formatDate(
                            latestGallery.createdAt
                          )}
                        </p>

                        <Link
                          href="/admin/gallery"
                          className="
                            text-xs
                            text-gray-400
                            hover:text-yellow-400
                          "
                        >
                          View Gallery →
                        </Link>

                      </div>

                    </>
                  )}

                  {!activityLoading &&
                    !latestGallery && (
                      <div className="px-7 pb-7">

                        <p className="text-sm text-gray-600">
                          No gallery images have been
                          uploaded yet.
                        </p>

                        <Link
                          href="/admin/gallery"
                          className="
                            inline-block
                            mt-5
                            text-sm
                            text-yellow-500
                          "
                        >
                          Upload First Image →
                        </Link>

                      </div>
                    )}

                </div>

              </div>

            </section>

            {/* MANAGEMENT */}

            <div className="mb-6">

              <p
                className="
                  text-gray-600
                  text-xs
                  uppercase
                  tracking-[0.3em]
                "
              >
                Management
              </p>

              <h2 className="text-2xl md:text-3xl font-serif mt-2">
                Website Controls
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {cards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="
                    group
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-7
                    md:p-8
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-yellow-500/30
                  "
                >

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      border
                      border-yellow-500/20
                      bg-yellow-500/5
                      flex
                      items-center
                      justify-center
                      text-2xl
                      mb-7
                    "
                  >
                    {card.icon}
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-serif
                      group-hover:text-yellow-400
                    "
                  >
                    {card.title}
                  </h3>

                  <p className="text-gray-500 mt-3 leading-relaxed">
                    {card.description}
                  </p>

                  <div
                    className="
                      mt-7
                      text-sm
                      text-gray-400
                      group-hover:text-yellow-400
                    "
                  >
                    {card.label} →
                  </div>

                </Link>
              ))}

            </div>

            {/* QUICK ACTIONS */}

            <section className="mt-12">

              <div
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.025]
                  p-7
                  md:p-8
                "
              >

                <p
                  className="
                    text-yellow-500
                    text-xs
                    uppercase
                    tracking-[0.3em]
                  "
                >
                  Quick Actions
                </p>

                <h2 className="text-2xl font-serif mt-2 mb-7">
                  Frequently Used
                </h2>

                <div className="flex flex-wrap gap-3">

                  <Link
                    href="/admin/notices"
                    className="
                      px-5
                      py-3
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.03]
                      text-sm
                      text-gray-300
                      hover:border-yellow-500/30
                      hover:text-yellow-400
                    "
                  >
                    + Create Notice
                  </Link>

                  <Link
                    href="/admin/gallery"
                    className="
                      px-5
                      py-3
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.03]
                      text-sm
                      text-gray-300
                      hover:border-yellow-500/30
                      hover:text-yellow-400
                    "
                  >
                    + Add Gallery Image
                  </Link>

                  <Link
                    href="/admin/settings"
                    className="
                      px-5
                      py-3
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.03]
                      text-sm
                      text-gray-300
                      hover:border-yellow-500/30
                      hover:text-yellow-400
                    "
                  >
                    ⚙ Website Settings
                  </Link>

                </div>

              </div>

            </section>

            {/* FOOTER */}

            <div className="mt-12 pt-6 border-t border-white/10">

              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  justify-between
                  gap-3
                  text-xs
                  text-gray-600
                "
              >

                <p>
                  Prabhu Union — Administration
                </p>

                <p>
                  Secure Management Panel
                </p>

              </div>

            </div>

          </section>

        </div>

      </main>
    </>
  );
}
