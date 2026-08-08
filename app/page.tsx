import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#f8f6f2] text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#5b0f18] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5b0f18] via-[#701522] to-[#3d0910]" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-36">
          <div className="max-w-3xl">

            <p className="text-yellow-400 font-semibold tracking-[0.2em] uppercase mb-5">
              Prabhu Trade Union
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Unity for Rights.
              <br />
              Strength for Workers.
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mb-10">
              Working together to protect employee rights, promote welfare,
              and build a stronger and more respectful workplace.
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              <button
                className="
                  bg-yellow-400
                  text-black
                  px-8
                  py-4
                  rounded-xl
                  font-semibold
                  shadow-lg
                  transition-all
                  duration-300
                  ease-out
                  hover:bg-yellow-300
                  hover:-translate-y-1
                  hover:scale-[1.02]
                  hover:shadow-xl
                  active:translate-y-0
                  active:scale-95
                  cursor-pointer
                "
              >
                Become a Member
              </button>

              <button
                className="
                  border
                  border-white/40
                  px-8
                  py-4
                  rounded-xl
                  font-semibold
                  transition-all
                  duration-300
                  ease-out
                  hover:bg-white/10
                  hover:border-white
                  hover:-translate-y-1
                  hover:shadow-lg
                  active:translate-y-0
                  active:scale-95
                  cursor-pointer
                "
              >
                Learn More
              </button>

            </div>

          </div>
        </div>
      </section>


      {/* ================= INTRO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div>

            <p className="text-[#8b1725] font-semibold uppercase tracking-widest mb-3">
              Who We Are
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#5b0f18] mb-6">
              Together We Stand Strong
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              Prabhu Trade Union is committed to protecting employee rights,
              promoting workplace harmony, supporting professional development,
              and strengthening collective welfare through democratic
              participation.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We believe that a strong organization is built through unity,
              transparency, mutual respect, and active participation from
              every member.
            </p>

          </div>


          {/* Statistics */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="grid grid-cols-2 gap-6">

              {/* Members */}
              <div
                className="
                  bg-[#f8f1e3]
                  rounded-2xl
                  p-6
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-2
                  hover:scale-[1.03]
                  hover:shadow-lg
                  cursor-pointer
                "
              >
                <div className="text-4xl font-bold text-[#5b0f18]">
                  500+
                </div>

                <p className="text-gray-600 mt-2">
                  Members
                </p>
              </div>


              {/* Years */}
              <div
                className="
                  bg-[#f8f1e3]
                  rounded-2xl
                  p-6
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-2
                  hover:scale-[1.03]
                  hover:shadow-lg
                  cursor-pointer
                "
              >
                <div className="text-4xl font-bold text-[#5b0f18]">
                  20+
                </div>

                <p className="text-gray-600 mt-2">
                  Years of Service
                </p>
              </div>


              {/* Programs */}
              <div
                className="
                  bg-[#f8f1e3]
                  rounded-2xl
                  p-6
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-2
                  hover:scale-[1.03]
                  hover:shadow-lg
                  cursor-pointer
                "
              >
                <div className="text-4xl font-bold text-[#5b0f18]">
                  25+
                </div>

                <p className="text-gray-600 mt-2">
                  Programs
                </p>
              </div>


              {/* Commitment */}
              <div
                className="
                  bg-[#f8f1e3]
                  rounded-2xl
                  p-6
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-2
                  hover:scale-[1.03]
                  hover:shadow-lg
                  cursor-pointer
                "
              >
                <div className="text-4xl font-bold text-[#5b0f18]">
                  100%
                </div>

                <p className="text-gray-600 mt-2">
                  Commitment
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= VALUES ================= */}
      <section className="bg-[#5b0f18] text-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <p className="text-yellow-400 uppercase tracking-widest font-semibold mb-3">
              Our Values
            </p>

            <h2 className="text-4xl font-bold">
              What We Stand For
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-8">

            {/* UNITY */}
            <div
              className="
                bg-white/10
                backdrop-blur-sm
                rounded-2xl
                p-8
                border
                border-white/10

                transition-all
                duration-300
                ease-out

                hover:-translate-y-3
                hover:scale-[1.04]
                hover:bg-white/15
                hover:shadow-2xl
                hover:border-white/20

                active:scale-[0.98]

                cursor-pointer
              "
            >

              <div className="text-4xl mb-5">
                🤝
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Unity
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Bringing employees together to create a stronger collective
                voice.
              </p>

            </div>


            {/* RIGHTS */}
            <div
              className="
                bg-white/10
                backdrop-blur-sm
                rounded-2xl
                p-8
                border
                border-white/10

                transition-all
                duration-300
                ease-out

                hover:-translate-y-3
                hover:scale-[1.04]
                hover:bg-white/15
                hover:shadow-2xl
                hover:border-white/20

                active:scale-[0.98]

                cursor-pointer
              "
            >

              <div className="text-4xl mb-5">
                ⚖️
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Rights
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Supporting fairness, dignity, equality, and workplace rights.
              </p>

            </div>


            {/* WELFARE */}
            <div
              className="
                bg-white/10
                backdrop-blur-sm
                rounded-2xl
                p-8
                border
                border-white/10

                transition-all
                duration-300
                ease-out

                hover:-translate-y-3
                hover:scale-[1.04]
                hover:bg-white/15
                hover:shadow-2xl
                hover:border-white/20

                active:scale-[0.98]

                cursor-pointer
              "
            >

              <div className="text-4xl mb-5">
                ❤️
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Welfare
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Promoting the professional and personal wellbeing of members.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ================= NOTICES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">

          <div>

            <p className="text-[#8b1725] font-semibold uppercase tracking-widest mb-3">
              Stay Updated
            </p>

            <h2 className="text-4xl font-bold text-[#5b0f18]">
              Latest Notices
            </h2>

          </div>


          <button
            className="
              mt-5
              md:mt-0
              text-[#8b1725]
              font-semibold

              transition-all
              duration-300

              hover:translate-x-1
              hover:text-[#5b0f18]

              active:scale-95

              cursor-pointer
            "
          >
            View All Notices →
          </button>

        </div>


        <div className="grid md:grid-cols-3 gap-6">

          {/* NOTICE 1 */}
          <div
            className="
              bg-white
              rounded-2xl
              p-7
              shadow-md
              border
              border-gray-100

              transition-all
              duration-300
              ease-out

              hover:-translate-y-2
              hover:shadow-xl
              hover:border-[#8b1725]/20

              cursor-pointer
            "
          >

            <span className="inline-block bg-[#f8e9c8] text-[#6b4b08] text-sm font-semibold px-3 py-1 rounded-full mb-5">
              Meeting
            </span>

            <h3 className="text-xl font-bold text-[#5b0f18] mb-3">
              Annual General Meeting
            </h3>

            <p className="text-gray-500 mb-5">
              Members are invited to participate in the Annual General
              Meeting.
            </p>

            <p className="text-sm font-semibold text-gray-700">
              15 September 2026
            </p>

          </div>


          {/* NOTICE 2 */}
          <div
            className="
              bg-white
              rounded-2xl
              p-7
              shadow-md
              border
              border-gray-100

              transition-all
              duration-300
              ease-out

              hover:-translate-y-2
              hover:shadow-xl
              hover:border-[#8b1725]/20

              cursor-pointer
            "
          >

            <span className="inline-block bg-[#f8e9c8] text-[#6b4b08] text-sm font-semibold px-3 py-1 rounded-full mb-5">
              Membership
            </span>

            <h3 className="text-xl font-bold text-[#5b0f18] mb-3">
              Membership Renewal
            </h3>

            <p className="text-gray-500 mb-5">
              Membership renewal for the new financial year is now open.
            </p>

            <p className="text-sm font-semibold text-gray-700">
              FY 2083/84
            </p>

          </div>


          {/* NOTICE 3 */}
          <div
            className="
              bg-white
              rounded-2xl
              p-7
              shadow-md
              border
              border-gray-100

              transition-all
              duration-300
              ease-out

              hover:-translate-y-2
              hover:shadow-xl
              hover:border-[#8b1725]/20

              cursor-pointer
            "
          >

            <span className="inline-block bg-[#f8e9c8] text-[#6b4b08] text-sm font-semibold px-3 py-1 rounded-full mb-5">
              Program
            </span>

            <h3 className="text-xl font-bold text-[#5b0f18] mb-3">
              Orientation Program
            </h3>

            <p className="text-gray-500 mb-5">
              An orientation program for members will be conducted at the
              union office.
            </p>

            <p className="text-sm font-semibold text-gray-700">
              Coming Soon
            </p>

          </div>

        </div>
      </section>


      {/* ================= GALLERY ================= */}
      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-[#8b1725] font-semibold uppercase tracking-widest mb-3">
              Our Activities
            </p>

            <h2 className="text-4xl font-bold text-[#5b0f18]">
              Recent Activities
            </h2>

          </div>


          <div className="grid md:grid-cols-2 gap-8">

            {/* GALLERY 1 */}
            <div
              className="
                group
                rounded-3xl
                overflow-hidden
                shadow-lg

                transition-all
                duration-300
                ease-out

                hover:-translate-y-2
                hover:shadow-2xl

                cursor-pointer
              "
            >

              <div className="overflow-hidden">

                <Image
                  src="/gallery/meeting-indoor.jpg"
                  alt="Indoor union meeting"
                  width={1000}
                  height={700}
                  className="
                    w-full
                    h-96
                    object-cover

                    transition-transform
                    duration-700
                    ease-out

                    group-hover:scale-105
                  "
                />

              </div>

              <div className="p-6">

                <h3 className="text-xl font-bold text-[#5b0f18]">
                  Executive Committee Meeting
                </h3>

                <p className="text-gray-500 mt-2">
                  Committee members discussing organizational activities.
                </p>

              </div>

            </div>


            {/* GALLERY 2 */}
            <div
              className="
                group
                rounded-3xl
                overflow-hidden
                shadow-lg

                transition-all
                duration-300
                ease-out

                hover:-translate-y-2
                hover:shadow-2xl

                cursor-pointer
              "
            >

              <div className="overflow-hidden">

                <Image
                  src="/gallery/meeting-outdoor.jpg"
                  alt="Outdoor union group photo"
                  width={1000}
                  height={700}
                  className="
                    w-full
                    h-96
                    object-cover

                    transition-transform
                    duration-700
                    ease-out

                    group-hover:scale-105
                  "
                />

              </div>

              <div className="p-6">

                <h3 className="text-xl font-bold text-[#5b0f18]">
                  Union Coordination Program
                </h3>

                <p className="text-gray-500 mt-2">
                  Members participating in a union coordination program.
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="bg-[#f8f1e3] py-20">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="text-[#8b1725] font-semibold uppercase tracking-widest mb-3">
            Be Part of the Union
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#5b0f18] mb-6">
            Your Voice Matters
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
            Join us in building a stronger, fairer, and more supportive
            workplace for everyone.
          </p>

          <button
            className="
              bg-[#5b0f18]
              text-white
              px-9
              py-4
              rounded-xl
              font-semibold
              shadow-lg

              transition-all
              duration-300
              ease-out

              hover:bg-[#741522]
              hover:-translate-y-1
              hover:scale-[1.03]
              hover:shadow-xl

              active:translate-y-0
              active:scale-95

              cursor-pointer
            "
          >
            Become a Member
          </button>

        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-[#26070b] text-white py-12">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-10">

            <div>

              <h3 className="text-2xl font-bold mb-4">
                Prabhu Trade Union
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Unity, rights, and welfare for a stronger and more
                supportive workplace.
              </p>

            </div>


            <div>

              <h4 className="font-semibold text-lg mb-4">
                Quick Links
              </h4>

              <div className="space-y-2 text-gray-400">

                <p className="transition-all duration-200 hover:text-white hover:translate-x-1 cursor-pointer">
                  About Us
                </p>

                <p className="transition-all duration-200 hover:text-white hover:translate-x-1 cursor-pointer">
                  Notices
                </p>

                <p className="transition-all duration-200 hover:text-white hover:translate-x-1 cursor-pointer">
                  Gallery
                </p>

                <p className="transition-all duration-200 hover:text-white hover:translate-x-1 cursor-pointer">
                  Contact
                </p>

              </div>

            </div>


            <div>

              <h4 className="font-semibold text-lg mb-4">
                Contact
              </h4>

              <div className="space-y-2 text-gray-400">

                <p>
                  Prabhu Trade Union Office
                </p>

                <p>
                  Nepal
                </p>

                <p>
                  Official Union Organization
                </p>

              </div>

            </div>

          </div>


          <div className="border-t border-white/10 mt-10 pt-6 text-center">

            <p className="text-gray-500 text-sm">
              © 2026 Prabhu Trade Union. All rights reserved.
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}