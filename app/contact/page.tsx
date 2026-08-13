import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      {/* Hero */}
      <section className="border-b border-black/5 bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-red-900 mb-4">
            Contact Us
          </p>

          <h1 className="font-serif text-5xl md:text-6xl text-[#171717]">
            We’d love to hear from you
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Reach out to Prabhu Trade Union for membership inquiries, notices,
            welfare support, and official communication.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="font-serif text-3xl text-[#171717] mb-8">
              Office Information
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 rounded-xl bg-red-50 p-3 text-red-900">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#171717]">Address</h3>
                  <p className="mt-1 text-gray-600 leading-7">
                    Prabhu Trade Union Office
                    <br />
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 rounded-xl bg-red-50 p-3 text-red-900">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#171717]">Phone</h3>
                  <p className="mt-1 text-gray-600">+977-9800000000</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 rounded-xl bg-red-50 p-3 text-red-900">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#171717]">Email</h3>
                  <p className="mt-1 text-gray-600">info@prabhutradeunion.np</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 rounded-xl bg-red-50 p-3 text-red-900">
                  <Clock className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#171717]">Office Hours</h3>
                  <p className="mt-1 text-gray-600 leading-7">
                    Sunday – Friday
                    <br />
                    10:00 AM – 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-500 hover:-translate-y-0.5"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="font-serif text-3xl text-[#171717] mb-8">
              Send a Message
            </h2>

            <form className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#171717]">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-red-900 focus:ring-2 focus:ring-red-900/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#171717]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-red-900 focus:ring-2 focus:ring-red-900/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#171717]">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-red-900 focus:ring-2 focus:ring-red-900/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#171717]">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-red-900 focus:ring-2 focus:ring-red-900/10"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-red-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800 hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-black/5 shadow-sm">
          <iframe
            src="https://www.google.com/maps?q=Kathmandu,Nepal&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Prabhu Trade Union Office Location"
          />
        </div>
      </section>
    </main>
  );
}