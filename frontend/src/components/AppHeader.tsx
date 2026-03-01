import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-b border-[#e5e8f6] bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-[#1f2a44]">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-[#4f46e5]" />
          QuickHire
        </Link>

        <nav className="flex items-center gap-2 text-sm font-medium">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-slate-600 transition hover:bg-[#f3f4fb] hover:text-[#1f2a44]"
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="rounded-lg px-3 py-2 text-slate-600 transition hover:bg-[#f3f4fb] hover:text-[#1f2a44]"
          >
            Jobs
          </Link>
          <Link
            href="/admin"
            className="rounded-lg bg-[#4f46e5] px-3 py-2 text-white transition hover:bg-[#4338ca]"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
