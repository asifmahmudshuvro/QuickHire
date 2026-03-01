"use client";

import { ApiError, getCurrentAdmin, loginAdmin } from "@/lib/api";
import { clearAuthToken, getAuthToken, setAuthToken } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
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
      setError(loginError instanceof Error ? loginError.message : "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#f5f6fb]">
        <AppHeader />
        <main className="mx-auto flex w-full max-w-md items-start px-4 py-8 max-[390px]:px-3 sm:px-6 sm:py-10 md:min-h-[calc(100vh-72px)] md:items-center">
          <section className="w-full rounded-2xl border border-[#e5e8f6] bg-white p-6 text-sm text-slate-500 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
            Checking your admin session...
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-md items-start px-4 py-8 max-[390px]:px-3 sm:px-6 sm:py-10 md:min-h-[calc(100vh-72px)] md:items-center">
        <section className="w-full rounded-2xl border border-[#e5e8f6] bg-white p-4 shadow-[0_8px_20px_rgba(79,70,229,0.06)] max-[390px]:p-3.5 sm:p-6">
          <h1 className="text-[26px] font-extrabold text-[#1f2a44] max-[390px]:text-2xl">Admin Sign In</h1>
          <p className="mt-2 text-sm text-slate-500 max-[390px]:text-[13px]">Sign in to manage QuickHire job listings.</p>

          <form action={onSubmit} className="mt-5 space-y-3">
            <input
              name="email"
              type="email"
              placeholder="admin@quickhire.test"
              required
              className="h-11 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 max-[390px]:text-[13px]"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="h-11 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 max-[390px]:text-[13px]"
            />

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4338ca] disabled:opacity-60 max-[390px]:text-[13px]"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <div className="mt-4 break-words text-xs text-slate-500 max-[390px]:text-[11px]">
            Demo credentials: <span className="font-semibold">admin@quickhire.test / admin12345</span>
          </div>

          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-[#4f46e5]">
            ← Back to Home
          </Link>
        </section>
      </main>
    </div>
  );
}
