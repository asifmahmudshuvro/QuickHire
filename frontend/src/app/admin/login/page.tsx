"use client";

import { Suspense } from "react";
import { ApiError, getCurrentAdmin, loginAdmin } from "@/lib/api";
import { clearAuthToken, getAuthToken, setAuthToken } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function AdminLoginContent() {
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
        <main className="mx-auto flex w-full max-w-md px-4 py-8">
          Checking your admin session...
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-md px-4 py-8">
        <section className="w-full rounded-2xl border bg-white p-6">
          <h1 className="text-xl font-bold">Admin Sign In</h1>

          <form action={onSubmit} className="mt-4 space-y-3">
            <input name="email" type="email" required className="w-full border p-2" />
            <input name="password" type="password" required className="w-full border p-2" />

            <button type="submit" disabled={loading} className="w-full bg-indigo-600 p-2 text-white">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <Link href="/" className="block mt-4 text-indigo-600">
            ← Back to Home
          </Link>
        </section>
      </main>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminLoginContent />
    </Suspense>
  );
}