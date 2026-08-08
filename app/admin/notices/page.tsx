export default function AdminNoticesPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] px-8 py-12">

      {/* Header */}
      <div className="max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-16">

          <div>
            <p className="text-sm tracking-[0.25em] uppercase text-red-900 mb-4">
              Prabhu Trade Union
            </p>

            <h1 className="text-5xl font-serif font-medium text-[#171717]">
              Notices
            </h1>

            <p className="text-gray-500 mt-4 text-lg">
              Union announcements and important updates.
            </p>
          </div>

          <button
            className="
              bg-red-900
              text-white
              px-6
              py-3
              rounded-full
              font-medium
              hover:bg-red-800
              hover:-translate-y-0.5
              transition-all
              duration-300
            "
          >
            + Add Notice
          </button>

        </div>


        {/* Section heading */}
        <div className="mb-8">

          <p className="text-xs tracking-[0.25em] uppercase text-gray-500">
            Latest
          </p>

          <h2 className="text-2xl font-serif mt-2 text-[#171717]">
            Recent Notices
          </h2>

        </div>


        {/* Notice */}
        <article
          className="
            group
            py-8
            border-t
            border-gray-300
            transition-all
            duration-300
            hover:bg-white/40
            hover:px-6
          "
        >

          <div className="flex justify-between gap-10">

            {/* Content */}
            <div className="max-w-3xl">

              <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                August 8, 2026
              </p>

              <h3
                className="
                  text-2xl
                  font-serif
                  text-red-900
                  group-hover:text-red-800
                  transition-colors
                "
              >
                Welcome to Prabhu Trade Union
              </h3>

              <p className="text-gray-600 mt-4 leading-7 text-base">
                This is a sample notice. Important union
                announcements will appear here.
              </p>

            </div>


            {/* Actions */}
            <div className="flex items-start gap-3 opacity-70 group-hover:opacity-100 transition">

              <button
                className="
                  px-4
                  py-2
                  text-sm
                  text-gray-700
                  hover:text-red-900
                  transition
                "
              >
                Edit
              </button>

              <button
                className="
                  px-4
                  py-2
                  text-sm
                  text-gray-500
                  hover:text-red-700
                  transition
                "
              >
                Delete
              </button>

            </div>

          </div>

        </article>


        {/* Second example notice */}
        <article
          className="
            group
            py-8
            border-t
            border-gray-300
            transition-all
            duration-300
            hover:bg-white/40
            hover:px-6
          "
        >

          <div className="flex justify-between gap-10">

            <div className="max-w-3xl">

              <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                Union Update
              </p>

              <h3
                className="
                  text-2xl
                  font-serif
                  text-[#171717]
                  group-hover:text-red-900
                  transition-colors
                "
              >
                Important Union Announcement
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                Important information and announcements
                for union members will be displayed here.
              </p>

            </div>

            <div className="flex items-start gap-3 opacity-70 group-hover:opacity-100 transition">

              <button
                className="
                  px-4
                  py-2
                  text-sm
                  text-gray-700
                  hover:text-red-900
                  transition
                "
              >
                Edit
              </button>

              <button
                className="
                  px-4
                  py-2
                  text-sm
                  text-gray-500
                  hover:text-red-700
                  transition
                "
              >
                Delete
              </button>

            </div>

          </div>

        </article>


        {/* Bottom spacing */}
        <div className="border-t border-gray-300" />

      </div>

    </main>
  );
}