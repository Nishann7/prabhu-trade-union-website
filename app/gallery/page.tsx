'use client';

import { useState } from 'react';
import Image from 'next/image';

const photos = [
  {
    src: '/gallery/meeting-indoor.jpg',
    title: 'Executive Committee Meeting',
    date: 'August 2026',
    description: 'Discussion and planning session with union members.',
  },
  {
    src: '/gallery/meeting-outdoor.jpg',
    title: 'Union Coordination Program',
    date: 'August 2026',
    description: 'Coordination and collaboration activities for members.',
  },
  {
    src: '/gallery/meeting-indoor.jpg',
    title: 'Member Welfare Session',
    date: 'July 2026',
    description: 'Welfare and support session conducted for members.',
  },
  {
    src: '/gallery/meeting-outdoor.jpg',
    title: 'Training & Awareness Program',
    date: 'July 2026',
    description: 'Awareness and training activities organized by the union.',
  },
  {
    src: '/gallery/meeting-indoor.jpg',
    title: 'General Assembly',
    date: 'June 2026',
    description: 'Annual gathering and interaction with union members.',
  },
  {
    src: '/gallery/meeting-outdoor.jpg',
    title: 'Community Outreach',
    date: 'June 2026',
    description: 'Community engagement and outreach initiative.',
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-sm tracking-[0.25em] uppercase text-red-900 mb-4">
            Prabhu Trade Union
          </p>

          <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#171717] mb-6">
            Gallery
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-8">
            Moments from meetings, welfare programs, training sessions, and union
            activities that reflect our commitment to unity, rights, and welfare.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <article
              key={index}
              className="
                group bg-white rounded-3xl overflow-hidden shadow-md
                hover:shadow-2xl hover:-translate-y-2
                transition-all duration-500 ease-out
                animate-fade-up
              "
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <button
                onClick={() => setSelectedImage(photo.src)}
                className="relative block w-full h-72 overflow-hidden focus:outline-none"
                aria-label={`Open ${photo.title}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="
                    object-cover transition-transform duration-700
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </button>

              <div className="p-6">
                <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                  {photo.date}
                </p>

                <h2 className="text-2xl font-serif text-[#171717] group-hover:text-red-900 transition-colors duration-300">
                  {photo.title}
                </h2>

                <p className="text-gray-600 mt-3 leading-7">
                  {photo.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="
                absolute -top-12 right-0 text-white text-3xl
                hover:text-gray-300 transition-colors
              "
              aria-label="Close preview"
            >
              ×
            </button>

            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={selectedImage}
                alt="Gallery Preview"
                fill
                className="object-contain bg-black"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}