"use client";

import { ApiError, getCurrentAdmin, loginAdmin } from "@/lib/api";
import { clearAuthToken, getAuthToken, setAuthToken } from "@/lib/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const nextPath = searchParams.get("next") || "/admin";

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      setCheckingSession(false);
      return;
    }

    getCurrentAdmin(token)
      .then((admin) => {
        if (!admin.is_admin) {
          clearAuthToken();
          return;
        }

        router.replace("/admin");
      })
      .catch(() => {
        clearAuthToken();
      })
      .finally(() => {
        setCheckingSession(false);
      });
  }, [router]);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const data = await loginAdmin({ email, password });

      if (!data.user.is_admin) {
        throw new ApiError("Admin access is required.", 403);
      }

      setAuthToken(data.token);
      router.push(nextPath);
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#f5f6fb]">
        <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-10 sm:px-6">
          <section className="w-full rounded-2xl border border-[#e5e8f6] bg-white p-6 text-sm text-slate-500 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
            Checking your admin session...
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-10 sm:px-6">
        <section className="w-full rounded-2xl border border-[#e5e8f6] bg-white p-6 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
          <h1 className="text-2xl font-extrabold text-[#1f2a44]">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to manage QuickHire job listings.</p>

          <form action={onSubmit} className="mt-5 space-y-3">
            <input
              name="email"
              type="email"
              placeholder="admin@quickhire.test"
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

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <div className="mt-4 text-xs text-slate-500">
            Demo credentials: <span className="font-semibold">admin@quickhire.test / admin12345</span>
          </div>

          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-[#4f46e5]">
            ← Back to home
          </Link>
        </section>
      </main>
    </div>
  );
}
