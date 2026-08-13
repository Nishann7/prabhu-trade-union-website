import { Users, ShieldCheck, Handshake, Award } from 'lucide-react';

const stats = [
  { label: 'Members', value: '500+' },
  { label: 'Years of Service', value: '15+' },
  { label: 'Programs Conducted', value: '120+' },
  { label: 'Committee Members', value: '12' },
];

const values = [
  {
    icon: Users,
    title: 'Unity',
    description:
      'We believe collective strength is the foundation of workers’ welfare and progress.',
  },
  {
    icon: ShieldCheck,
    title: 'Rights Protection',
    description:
      'We work to safeguard the professional and legal rights of our members.',
  },
  {
    icon: Handshake,
    title: 'Welfare',
    description:
      'Member welfare, support, and solidarity remain at the center of our activities.',
  },
  {
    icon: Award,
    title: 'Integrity',
    description:
      'Transparency, accountability, and ethical leadership guide our organization.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      {/* Hero */}
      <section className="border-b border-black/5 bg-white/60">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-red-900 mb-4">
            About Prabhu Trade Union
          </p>

          <h1 className="font-serif text-5xl md:text-6xl text-[#171717] leading-tight">
            Working Together for Dignity, Rights, and Welfare
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Prabhu Trade Union is a member-focused organization committed to
            protecting workers’ rights, promoting welfare programs, and building
            a stronger professional community through unity and collective action.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-red-900 mb-3">
              Our History
            </p>

            <h2 className="font-serif text-4xl text-[#171717] mb-6">
              A trusted voice for workers and members
            </h2>

            <div className="space-y-5 text-gray-700 leading-8">
              <p>
                Established with the goal of representing and supporting its
                members, Prabhu Trade Union has steadily grown into a respected
                organization that advocates for fair treatment, professional
                dignity, and collective welfare.
              </p>

              <p>
                Over the years, the union has organized meetings, awareness
                programs, welfare initiatives, training sessions, and community
                activities that strengthen solidarity among members.
              </p>

              <p>
                Today, we continue to work closely with members, stakeholders, and
                the wider community to create opportunities for growth, security,
                and social well-being.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-[#171717]">Established</h3>
                <p className="text-gray-600 mt-1">Add official establishment year</p>
              </div>

              <div className="border-t border-black/5 pt-6">
                <h3 className="font-semibold text-lg text-[#171717]">Registration</h3>
                <p className="text-gray-600 mt-1">Add official registration number</p>
              </div>

              <div className="border-t border-black/5 pt-6">
                <h3 className="font-semibold text-lg text-[#171717]">Head Office</h3>
                <p className="text-gray-600 mt-1">Kathmandu, Nepal</p>
              </div>

              <div className="border-t border-black/5 pt-6">
                <h3 className="font-semibold text-lg text-[#171717]">Service Area</h3>
                <p className="text-gray-600 mt-1">Union members and affiliated workers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white/70 border-y border-black/5">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-2">
          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-red-900 mb-3">
              Mission
            </p>

            <h2 className="font-serif text-3xl text-[#171717] mb-4">
              Our Mission
            </h2>

            <p className="text-gray-700 leading-8">
              To protect the rights and interests of members, promote welfare and
              professional development, and foster unity through democratic and
              transparent representation.
            </p>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-red-900 mb-3">
              Vision
            </p>

            <h2 className="font-serif text-3xl text-[#171717] mb-4">
              Our Vision
            </h2>

            <p className="text-gray-700 leading-8">
              To build a strong, respected, and inclusive union that contributes
              to social justice, economic security, and sustainable welfare for
              all members and their families.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="font-serif text-4xl text-red-900">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-white/70 border-y border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.24em] text-red-900 mb-3">
              Core Values
            </p>

            <h2 className="font-serif text-4xl text-[#171717]">
              Principles that guide our work
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-red-50 p-3 text-red-900">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-semibold text-[#171717]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-7">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl border border-black/5 bg-white p-8 md:p-12 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-red-900 mb-3">
                Office Highlights
              </p>

              <h2 className="font-serif text-4xl text-[#171717] mb-6">
                What we regularly organize
              </h2>

              <ul className="space-y-4 text-gray-700 leading-7">
                <li>• General assembly meetings</li>
                <li>• Executive committee meetings</li>
                <li>• Welfare and support programs</li>
                <li>• Training and awareness sessions</li>
                <li>• Community outreach activities</li>
                <li>• Member coordination programs</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-[#efe9dc] p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-red-900 mb-3">
                Commitment
              </p>

              <blockquote className="font-serif text-2xl leading-10 text-[#171717]">
                “Our strength comes from the unity of our members and our shared
                commitment to dignity, fairness, and welfare.”
              </blockquote>

              <p className="mt-6 text-sm text-gray-600">
                — Prabhu Trade Union
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}