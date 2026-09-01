export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.25em] uppercase text-red-900 mb-4">
            Prabhu Union
          </p>

          <h1 className="text-5xl font-serif text-[#171717] mb-6">
            Downloads
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-8">
            Download membership forms, notices, and official union documents.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold text-[#171717]">
                Membership Application Form
              </h2>
              <p className="text-gray-600 mt-1">
                PDF • Updated August 2026
              </p>
            </div>

            <a
              href="/documents/membership-form.pdf"
              className="inline-flex items-center justify-center rounded-full bg-red-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800 hover:-translate-y-0.5"
            >
              Download PDF
            </a>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold text-[#171717]">
                Union Constitution
              </h2>
              <p className="text-gray-600 mt-1">
                PDF • Official document
              </p>
            </div>

            <a
              href="/documents/union-constitution.pdf"
              className="inline-flex items-center justify-center rounded-full bg-red-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800 hover:-translate-y-0.5"
            >
              Download PDF
            </a>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold text-[#171717]">
                Welfare Program Guidelines
              </h2>
              <p className="text-gray-600 mt-1">
                PDF • Member welfare information
              </p>
            </div>

            <a
              href="/documents/welfare-guidelines.pdf"
              className="inline-flex items-center justify-center rounded-full bg-red-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800 hover:-translate-y-0.5"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
