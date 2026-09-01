import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-black/10 bg-[#171717] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-2xl text-white">
            Prabhu Union
          </h3>

          <p className="mt-4 text-sm leading-7 text-gray-300">
            Working for the dignity, rights, welfare, and professional growth of
            our members through unity and collective action.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-200">
            Quick Links
          </h4>

          <ul className="mt-4 space-y-3 text-sm text-gray-300">
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/committee" className="hover:text-white transition">
                Committee
              </Link>
            </li>

            <li>
              <Link href="/notices" className="hover:text-white transition">
                Notices
              </Link>
            </li>

            <li>
              <Link href="/gallery" className="hover:text-white transition">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-200">
            Contact
          </h4>

          <ul className="mt-4 space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-amber-400" />
              Kathmandu, Nepal
            </li>

            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-amber-400" />
              +977-9800000000
            </li>

            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-amber-400" />
              info@prabhutradeunion.np
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-200">
            Follow Us
          </h4>

          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition hover:border-amber-400 hover:text-amber-400 text-lg font-bold"
              aria-label="Facebook"
            >
              f
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Office Hours: Sun–Fri, 10:00 AM – 5:00 PM
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Prabhu Union. All rights reserved.</p>

          <p>Designed & Developed by Nishan Karki</p>
        </div>
      </div>
    </footer>
  );
}
