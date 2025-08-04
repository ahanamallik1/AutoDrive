"use client";

import Link from "next/link";
// Navbar component renders the main site header with branding
export default function Navbar() {
  return (
    <header className="bg-emerald-600 shadow-sm">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-white tracking-tight">
                Autos
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
