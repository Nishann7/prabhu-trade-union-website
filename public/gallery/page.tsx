"use client";

import { useEffect, useState } from "react";

type GalleryPhoto = {
  _id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
};

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to load gallery"
          );
        }

        setPhotos(data.photos || []);
      } catch (error) {
        console.error(
          "Error loading gallery:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* =========================
            HEADER
        ========================= */}

        <div className="text-center mb-14">

          <p className="text-sm tracking-[0.28em] uppercase text-red-900 mb-4">
            Prabhu Trade Union
          </p>

          <h1 className="text-5xl font-bold text-red-900 mb-4">
            Gallery
          </h1>

          <p className="text-gray-600 text-lg">
            Moments from meetings, programs, and
            union activities.
          </p>

        </div>

        {/* =========================
            LOADING
        ========================= */}

        {loading && (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-lg">
              Loading gallery...
            </p>
          </div>
        )}

        {/* =========================
            NO PHOTOS
        ========================= */}

        {!loading && photos.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              No Photos Yet
            </h2>

            <p className="text-gray-500">
              Gallery photos will appear here once
              they are uploaded.
            </p>
          </div>
        )}

        {/* =========================
            PHOTO GRID
        ========================= */}

        {!loading && photos.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {photos.map((photo) => (
              <article
                key={photo._id}
                className="
                  group
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                "
              >

                {/* IMAGE */}

                <div className="overflow-hidden">

                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="
                      w-full
                      h-64
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <h2 className="
                    text-2xl
                    font-semibold
                    text-gray-900
                    mb-2
                  ">
                    {photo.title}
                  </h2>

                  <p className="
                    text-gray-500
                    text-sm
                  ">
                    Prabhu Trade Union
                  </p>

                  <p className="
                    text-xs
                    text-gray-400
                    mt-3
                  ">
                    Added{" "}
                    {new Date(
                      photo.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>
    </main>
  );
}