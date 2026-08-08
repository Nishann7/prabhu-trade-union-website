export default function AdminCommitteePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-red-900 mb-6">
          Committee Management
        </h1>

        <form className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Member Name
            </label>

            <input
              type="text"
              placeholder="Enter member name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Designation
            </label>

            <input
              type="text"
              placeholder="President, Secretary, Treasurer..."
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
            Add Member
          </button>

        </form>

        <div className="mt-10 border-t pt-6">

          <h2 className="text-xl font-semibold mb-4">
            Current Committee
          </h2>

          <div className="space-y-3">

            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">President Name</p>
                <p className="text-sm text-gray-500">President</p>
              </div>

              <button className="text-red-600 hover:text-red-800 font-medium">
                Remove
              </button>
            </div>

            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">General Secretary Name</p>
                <p className="text-sm text-gray-500">General Secretary</p>
              </div>

              <button className="text-red-600 hover:text-red-800 font-medium">
                Remove
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}