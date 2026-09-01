import Image from 'next/image';

const committeeMembers = [
  {
    name: 'President Name',
    designation: 'President',
    image: '/gallery/meeting-indoor.jpg',
  },
  {
    name: 'General Secretary Name',
    designation: 'General Secretary',
    image: '/gallery/meeting-outdoor.jpg',
  },
  {
    name: 'Treasurer Name',
    designation: 'Treasurer',
    image: '/gallery/meeting-indoor.jpg',
  },
  {
    name: 'Vice President Name',
    designation: 'Vice President',
    image: '/gallery/meeting-outdoor.jpg',
  },
];

export default function CommitteePage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.25em] uppercase text-red-900 mb-4">
            Leadership
          </p>

          <h1 className="text-5xl md:text-6xl font-serif text-[#171717] mb-6">
            Executive Committee
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-8">
            Meet the elected representatives leading Prabhu Union with
            dedication, transparency, and commitment to member welfare.
          </p>
        </div>

        {/* Committee Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {committeeMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 text-center">
                <h2 className="text-xl font-serif text-[#171717]">
                  {member.name}
                </h2>

                <p className="mt-2 text-sm uppercase tracking-[0.15em] text-red-900 font-medium">
                  {member.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
