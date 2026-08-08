export default function AdminSettingsPage() {
  return (
    <main className="p-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-red-900 mb-6">
          Website Settings
        </h1>

        <form className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Union Name
            </label>

            <input
              type="text"
              defaultValue="Prabhu Trade Union"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Address
            </label>

            <input
              type="text"
              placeholder="Enter office address"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone
            </label>

            <input
              type="text"
              placeholder="+977-XXXXXXXXXX"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="info@example.com"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>

          <button
            type="submit"
            className="bg-red-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition"
          >
            Save Settings
          </button>

        </form>
      </div>
    </main>
  );
}