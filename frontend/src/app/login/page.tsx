"use client";

import Link from "next/link";
import { useState } from "react";

export default function UserLoginPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const email = String(formData.get("email") ?? "").trim();

    await new Promise((resolve) => setTimeout(resolve, 500));

    setMessage(`Welcome back, ${email || "user"}. User login UI is ready.`);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-10 sm:px-6">
        <section className="w-full rounded-2xl border border-[#e5e8f6] bg-white p-6 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
          <h1 className="text-2xl font-extrabold text-[#1f2a44]">User Login</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to manage your profile, saved jobs, and applications.</p>

          <form action={onSubmit} className="mt-5 space-y-3">
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4338ca] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {message ? <p className="mt-3 text-sm text-emerald-600">{message}</p> : null}

          <p className="mt-4 text-sm text-slate-500">
            New here?{" "}
            <Link href="/signup" className="font-semibold text-[#4f46e5]">
              Create an account
            </Link>
          </p>

          <p className="mt-3 text-xs text-slate-400">
            Recruiter/Admin access is available at{" "}
            <Link href="/admin/login" className="font-semibold text-[#4f46e5]">
              /admin/login
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
