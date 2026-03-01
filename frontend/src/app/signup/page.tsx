"use client";

import { registerUser } from "@/lib/api";
import { clearUserAuthToken, setUserAuthToken } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserSignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    setError(null);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const passwordConfirmation = String(formData.get("password_confirmation") ?? "");

    try {
      const data = await registerUser({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      clearUserAuthToken();
      setUserAuthToken(data.token);
      setMessage("Account created successfully. Redirecting...");

      setTimeout(() => {
        router.push("/jobs");
        router.refresh();
      }, 500);
    } catch (signupError) {
      setError(signupError instanceof Error ? signupError.message : "Sign-up failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-md items-start px-4 py-8 max-[390px]:px-3 sm:px-6 sm:py-10 md:min-h-[calc(100vh-72px)] md:items-center">
        <section className="w-full rounded-2xl border border-[#e5e8f6] bg-white p-4 shadow-[0_8px_20px_rgba(79,70,229,0.06)] max-[390px]:p-3.5 sm:p-6">
          <h1 className="text-[26px] font-extrabold text-[#1f2a44] max-[390px]:text-2xl">Create User Account</h1>
          <p className="mt-2 text-sm text-slate-500 max-[390px]:text-[13px]">Sign up as a candidate to apply for jobs and track applications.</p>

          <form action={onSubmit} className="mt-5 space-y-3">
            <input
              name="name"
              type="text"
              placeholder="Full name"
              required
              className="h-11 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 max-[390px]:text-[13px]"
            />
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
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
            <input
              name="password_confirmation"
              type="password"
              placeholder="Confirm password"
              required
              className="h-11 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 max-[390px]:text-[13px]"
            />

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4338ca] disabled:opacity-60 max-[390px]:text-[13px]"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          {message ? <p className="mt-3 text-sm text-emerald-600">{message}</p> : null}

          <p className="mt-4 text-sm text-slate-500 max-[390px]:text-[13px]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#4f46e5]">
              Log in
            </Link>
          </p>

          <p className="mt-3 text-xs text-slate-400 max-[390px]:text-[11px]">
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
