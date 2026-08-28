"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type GalleryPhoto = {
  _id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
};

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery");

        if (!response.ok) {
          throw new Error("Failed to fetch gallery");
        }

        const data = await response.json();

        if (data.success) {
          setPhotos(data.photos || []);
        }
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f5f0]">

      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="text-center mb-16">

          <p className="text-sm tracking-[0.25em] uppercase text-red-900 mb-4">
            Prabhu Trade Union
          </p>

          <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#171717] mb-6">
            Gallery
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-8">
            Moments from meetings, welfare programs, training sessions,
            and union activities that reflect our commitment to unity,
            rights, and welfare.
          </p>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="py-20 text-center">
            <p className="text-gray-500">
              Loading gallery...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && photos.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <p className="text-gray-500">
              No gallery photos available yet.
            </p>
          </div>
        )}

        {/* GALLERY */}
        {!loading && photos.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {photos.map((photo, index) => (
              <article
                key={photo._id}
                className="
                  group
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-md
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >

                {/* IMAGE */}

                <button
                  type="button"
                  onClick={() => setSelectedImage(photo.imageUrl)}
                  className="
                    relative
                    block
                    w-full
                    h-72
                    overflow-hidden
                    focus:outline-none
                  "
                  aria-label={`Open ${photo.title}`}
                >

                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/0
                      group-hover:bg-black/10
                      transition-colors
                      duration-500
                    "
                  />

                </button>

                {/* DETAILS */}

                <div className="p-6">

                  <p
                    className="
                      text-xs
                      tracking-[0.2em]
                      uppercase
                      text-gray-500
                      mb-3
                    "
                  >
                    {new Date(photo.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-serif
                      text-[#171717]
                      group-hover:text-red-900
                      transition-colors
                      duration-300
                    "
                  >
                    {photo.title}
                  </h2>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

      {/* LIGHTBOX */}

      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/80
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() => setSelectedImage(null)}
        >

          <div
            className="
              relative
              max-w-5xl
              w-full
              h-[80vh]
            "
            onClick={(event) => event.stopPropagation()}
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="
                absolute
                -top-12
                right-0
                z-10
                text-white
                text-4xl
                hover:text-gray-300
                transition-colors
              "
              aria-label="Close preview"
            >
              ×
            </button>

            {/* LARGE IMAGE */}

            <Image
              src={selectedImage}
              alt="Gallery Preview"
              fill
              sizes="100vw"
              className="object-contain"
            />

          </div>

        </div>
      )}

    </main>
  );
}