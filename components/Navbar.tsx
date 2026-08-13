'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/committee', label: 'Committee' },
  { href: '/notices', label: 'Notices' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#f7f5f0]/90 backdrop-blur-md">
      {/* Top contact bar */}
      <div className="border-b border-black/5 bg-[#efe9dc]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-[#5b4b3a]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              +977-9800000000
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              info@prabhutradeunion.np
            </span>
          </div>

          <div className="hidden md:block tracking-[0.18em] uppercase text-[11px]">
            Unity • Rights • Welfare
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-900 text-white font-bold shadow-sm transition-transform duration-300 group-hover:scale-105">
            PT
          </div>

          <div>
            <p className="font-serif text-xl leading-none text-red-900">
              Prabhu Trade Union
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
              Official Website
            </p>
          </div>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-[#171717] transition-colors duration-300 hover:text-red-900 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-900 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/apply"
            className="rounded-full bg-red-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
          >
            Become a Member
          </Link>
        </nav>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden rounded-full border border-black/10 p-2 text-[#171717] transition hover:bg-black/5"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-black/5 bg-[#f7f5f0]">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[#171717] transition hover:bg-black/5 hover:text-red-900"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/apply"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-red-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-800"
            >
              Become a Member
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}