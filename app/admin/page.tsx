import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-red-900">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Manage notices, gallery photos, and union information.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link
            href="/admin/notices"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition block"
          >
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              Notices
            </h2>

            <p className="text-gray-600 text-sm">
              Add and manage notices
            </p>
          </Link>

          <Link
            href="/admin/gallery"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition block"
          >
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              Gallery
            </h2>

            <p className="text-gray-600 text-sm">
              Upload and manage photos
            </p>
          </Link>

          <Link
            href="/admin/committee"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition block"
          >
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              Committee
            </h2>

            <p className="text-gray-600 text-sm">
              Update committee members
            </p>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition block"
          >
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              Settings
            </h2>

            <p className="text-gray-600 text-sm">
              Update contact information
            </p>
          </Link>

        </div>
      </div>
    </main>
  );
}