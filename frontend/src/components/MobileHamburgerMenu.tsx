"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen ? (
        <nav className="absolute right-0 top-10 z-40 w-52 rounded-xl border border-[#e5e8f6] bg-white p-2 shadow-[0_10px_25px_rgba(31,42,68,0.12)]">
          <Link
            href="/jobs"
            onClick={closeMenu}
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#1f2a44]"
          >
            Find Jobs
          </Link>
          <Link
            href="/#companies"
            onClick={closeMenu}
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#1f2a44]"
          >
            Browse Companies
          </Link>
          <Link
            href="/login"
            onClick={closeMenu}
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#1f2a44]"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            onClick={closeMenu}
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#1f2a44]"
          >
            Sign up
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
