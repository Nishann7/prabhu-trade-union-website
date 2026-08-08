export default function AdminGalleryPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-red-900 mb-6">
          Gallery Management
        </h1>

        <form className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Photo Title
            </label>

            <input
              type="text"
              placeholder="Enter photo title"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Photo
            </label>

            <input
              type="file"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="bg-red-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition"
          >
            Upload Photo
          </button>

        </form>

        <div className="mt-10 border-t pt-6">

          <h2 className="text-xl font-semibold mb-4">
            Existing Photos
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="border rounded-lg p-4 flex items-center justify-between">
              <span>Executive Committee Meeting</span>

              <button className="text-red-600 hover:text-red-800 font-medium">
                Delete
              </button>
            </div>

            <div className="border rounded-lg p-4 flex items-center justify-between">
              <span>Union Coordination Program</span>

              <button className="text-red-600 hover:text-red-800 font-medium">
                Delete
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}