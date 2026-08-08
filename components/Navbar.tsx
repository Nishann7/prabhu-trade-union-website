import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Title */}
        <div>
          <h1 className="text-xl font-bold text-red-900">
            Prabhu Trade Union
          </h1>
          <p className="text-xs text-gray-500">
            Official Union Website
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-red-800">
            Home
          </Link>

          <Link href="/about" className="hover:text-red-800">
            About
          </Link>

          <Link href="/gallery" className="hover:text-red-800">
            Gallery
          </Link>

          <Link href="/contact" className="hover:text-red-800">
            Contact
          </Link>

          <Link
            href="/admin"
            className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
          >
            Admin Login
          </Link>
        </nav>

      </div>
    </header>
  );
}