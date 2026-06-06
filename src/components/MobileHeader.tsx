"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@content/site";

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg px-6 py-4">
      <Link
        href="/"
        className="font-bold text-xl tracking-tight text-text"
        onClick={() => setOpen(false)}
      >
        {site.name}
      </Link>

      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block h-0.5 w-5 bg-text transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 bg-text transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 bg-text transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="absolute left-0 top-full w-full border-b border-border bg-bg px-6 py-4"
        >
          <ul className="space-y-4">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-lg font-medium text-text hover:text-link"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
