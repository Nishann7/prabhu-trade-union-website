import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="mb-12 border-b border-gray-200 pb-5">
      <div className="flex items-center justify-between">

        {/* =========================
            PUBLIC WEBSITE
        ========================= */}

        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              bg-red-900
              text-sm
              font-serif
              font-semibold
              text-white
              transition-all
              duration-300
              group-hover:bg-red-800
              group-hover:shadow-md
            "
          >
            P
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-[#171717]">
              PRABHU
            </p>

            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
              Prabhu Union
            </p>
          </div>
        </Link>


        {/* =========================
            ADMIN DASHBOARD
        ========================= */}

        <Link
          href="/admin"
          className="
            group
            flex
            items-center
            gap-3
            rounded-full
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            transition-all
            duration-300
            hover:border-red-200
            hover:bg-red-50
          "
        >

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-red-900
              text-xs
              font-semibold
              text-white
              transition-all
              duration-300
              group-hover:bg-red-800
            "
          >
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-[#171717]">
              Admin Panel
            </p>

            <p className="text-[10px] text-gray-400">
              Dashboard
            </p>
          </div>

          <span
            className="
              text-gray-400
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:text-red-900
            "
          >
            →
          </span>

        </Link>

      </div>
    </header>
  );
}
