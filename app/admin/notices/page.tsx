export default function AdminNoticesPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 md:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm tracking-[0.28em] uppercase text-red-900 mb-4">
              Prabhu Trade Union
            </p>

            <h1 className="text-4xl md:text-5xl font-serif font-medium text-[#171717] leading-tight">
              Notices
            </h1>

            <p className="text-gray-500 mt-4 text-base md:text-lg max-w-xl">
              Union announcements, meeting schedules, and important updates for all members.
            </p>
          </div>

          <button
            className="
              bg-red-900 text-white px-6 py-3 rounded-full font-medium
              shadow-sm transition-all duration-300 ease-out
              hover:bg-red-800 hover:-translate-y-1 hover:shadow-lg
              active:translate-y-0 active:scale-[0.98]
            "
          >
            + Add Notice
          </button>
        </div>

        {/* Section heading */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.28em] uppercase text-gray-500">
            Latest
          </p>

          <h2 className="text-2xl font-serif mt-2 text-[#171717]">
            Recent Notices
          </h2>
        </div>

        {/* Notice 1 */}
        <article
          className="
            group border-t border-gray-300 py-8
            transition-all duration-500 ease-out
            hover:bg-white/70 hover:px-6 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]
            rounded-2xl
          "
        >
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                August 8, 2026
              </p>

              <h3
                className="
                  text-2xl font-serif text-red-900
                  transition-all duration-300
                  group-hover:text-red-800 group-hover:translate-x-1
                "
              >
                Welcome to Prabhu Trade Union
              </h3>

              <p className="text-gray-600 mt-4 leading-7 text-base">
                This is a sample notice. Important union announcements and updates
                for members will appear here.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-start gap-2 md:gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="
                  px-4 py-2 text-sm rounded-full
                  text-gray-700 border border-transparent
                  transition-all duration-200
                  hover:text-red-900 hover:border-red-200 hover:bg-red-50
                "
              >
                Edit
              </button>

              <button
                className="
                  px-4 py-2 text-sm rounded-full
                  text-gray-500 border border-transparent
                  transition-all duration-200
                  hover:text-red-700 hover:border-red-200 hover:bg-red-50
                "
              >
                Delete
              </button>
            </div>
          </div>
        </article>

        {/* Notice 2 */}
        <article
          className="
            group border-t border-gray-300 py-8
            transition-all duration-500 ease-out
            hover:bg-white/70 hover:px-6 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]
            rounded-2xl
          "
        >
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                Union Update
              </p>

              <h3
                className="
                  text-2xl font-serif text-[#171717]
                  transition-all duration-300
                  group-hover:text-red-900 group-hover:translate-x-1
                "
              >
                Important Union Announcement
              </h3>

              <p className="text-gray-600 mt-4 leading-7 text-base">
                Important information regarding member welfare programs and upcoming
                activities will be displayed here.
              </p>
            </div>

            <div className="flex items-start gap-2 md:gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="
                  px-4 py-2 text-sm rounded-full
                  text-gray-700 border border-transparent
                  transition-all duration-200
                  hover:text-red-900 hover:border-red-200 hover:bg-red-50
                "
              >
                Edit
              </button>

              <button
                className="
                  px-4 py-2 text-sm rounded-full
                  text-gray-500 border border-transparent
                  transition-all duration-200
                  hover:text-red-700 hover:border-red-200 hover:bg-red-50
                "
              >
                Delete
              </button>
            </div>
          </div>
        </article>

        {/* Bottom border */}
        <div className="border-t border-gray-300 mt-2" />
      </div>
    </main>
  );
}