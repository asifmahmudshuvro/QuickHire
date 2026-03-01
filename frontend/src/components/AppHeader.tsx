import Link from "next/link";
import { UserAuthMenu } from "@/components/UserAuthMenu";

export function AppHeader() {
  return (
    <header className="bg-[#f3f4fb]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-extrabold leading-none text-[#4f46e5]">
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#4f46e5] sm:h-6 sm:w-6">
              <span className="h-3 w-3 rounded-full border-2 border-white sm:h-3.5 sm:w-3.5" />
              <span className="absolute right-[3px] top-[3px] h-1 w-1 rounded-full bg-white sm:h-1.5 sm:w-1.5" />
            </span>
            <span className="text-base font-extrabold tracking-tight text-[#1f2a44] sm:text-[24px]">QuickHire</span>
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] font-semibold text-slate-500 lg:flex">
            <Link href="/jobs" className="hover:text-[#1f2a44]">
              Find Jobs
            </Link>
            <Link href="/#companies" className="hover:text-[#1f2a44]">
              Browse Companies
            </Link>
          </nav>
        </div>

        <UserAuthMenu />

        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 lg:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
}
