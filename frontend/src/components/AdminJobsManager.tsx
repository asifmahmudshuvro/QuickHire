"use client";

import { createJob, deleteJob, getCurrentAdmin, logoutAdmin } from "@/lib/api";
import { clearAuthToken, getAuthToken } from "@/lib/auth";
import type { Job } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type AdminJobsManagerProps = {
  initialJobs: Job[];
};

export function AdminJobsManager({ initialJobs }: AdminJobsManagerProps) {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminName, setAdminName] = useState<string>("Admin");

  const sortedJobs = useMemo(
    () => [...jobs].sort((a, b) => Number(b.id) - Number(a.id)),
    [jobs],
  );

  const totalJobs = jobs.length;
  const totalCategories = new Set(jobs.map((job) => job.category)).size;
  const totalLocations = new Set(jobs.map((job) => job.location)).size;
  const latestJobTitle = sortedJobs[0]?.title ?? "No jobs yet";

  useEffect(() => {
    const authToken = getAuthToken();

    if (!authToken) {
      setAuthLoading(false);
      return;
    }

    getCurrentAdmin(authToken)
      .then((admin) => {
        setToken(authToken);
        setAdminName(admin.name);
      })
      .catch(() => {
        clearAuthToken();
        setToken(null);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

  async function onCreateJob(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      title: String(formData.get("title") ?? ""),
      company: String(formData.get("company") ?? ""),
      location: String(formData.get("location") ?? ""),
      category: String(formData.get("category") ?? ""),
      description: String(formData.get("description") ?? ""),
    };

    try {
      if (!token) {
        throw new Error("Please login as admin.");
      }

      const created = await createJob(payload, token);
      setJobs((prev) => [created, ...prev]);
      setSuccess("Job created successfully.");
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Failed to create job.");
    } finally {
      setLoading(false);
    }
  }

  async function onDeleteJob(id: number) {
    setError(null);
    setSuccess(null);

    try {
      if (!token) {
        throw new Error("Please login as admin.");
      }

      await deleteJob(id, token);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      setSuccess("Job deleted successfully.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete job.");
    }
  }

  async function onLogout() {
    if (token) {
      await logoutAdmin(token).catch(() => undefined);
    }

    clearAuthToken();
    setToken(null);
    setSuccess("Logged out successfully.");
    router.push("/admin/login");
    router.refresh();
  }

  if (authLoading) {
    return (
      <section className="rounded-2xl border border-[#e5e8f6] bg-white p-5 text-sm text-slate-500 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
        Checking admin authentication...
      </section>
    );
  }

  if (!token) {
    return (
      <section className="rounded-2xl border border-[#e5e8f6] bg-white p-6 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
        <h2 className="text-xl font-bold text-[#1f2a44]">Admin access required</h2>
        <p className="mt-2 text-sm text-slate-500">
          Please login to create or delete job listings.
        </p>
        <Link
          href="/admin/login"
          className="mt-4 inline-flex rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
        >
          Go to Admin Login
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between rounded-2xl border border-[#e5e8f6] bg-white p-4 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
        <p className="text-sm text-slate-600">
          Logged in as <span className="font-semibold text-[#1f2a44]">{adminName}</span>
        </p>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-lg border border-[#4f46e5]/30 px-3 py-1.5 text-xs font-semibold text-[#4f46e5] hover:bg-[#eef2ff]"
        >
          Logout
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-[#e5e8f6] bg-white p-4 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Jobs</p>
          <p className="mt-2 text-3xl font-extrabold text-[#1f2a44]">{totalJobs}</p>
        </article>
        <article className="rounded-2xl border border-[#e5e8f6] bg-white p-4 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Categories</p>
          <p className="mt-2 text-3xl font-extrabold text-[#1f2a44]">{totalCategories}</p>
        </article>
        <article className="rounded-2xl border border-[#e5e8f6] bg-white p-4 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Locations</p>
          <p className="mt-2 text-3xl font-extrabold text-[#1f2a44]">{totalLocations}</p>
        </article>
        <article className="rounded-2xl border border-[#e5e8f6] bg-white p-4 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Latest Job</p>
          <p className="mt-2 line-clamp-2 text-sm font-semibold text-[#1f2a44]">{latestJobTitle}</p>
        </article>
      </section>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}
      {success ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <section className="rounded-2xl border border-[#e5e8f6] bg-white p-5 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
          <h2 className="text-lg font-semibold text-[#1f2a44]">Add New Job</h2>

          <form action={onCreateJob} className="mt-4 space-y-3">
            <input name="title" required placeholder="Job title" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600" />
            <input name="company" required placeholder="Company" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600" />
            <input name="location" required placeholder="Location" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600" />
            <input name="category" required placeholder="Category" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600" />
            <textarea
              name="description"
              required
              rows={6}
              placeholder="Job description"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4338ca] disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Job"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-[#e5e8f6] bg-white p-5 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
          <h2 className="text-lg font-semibold text-[#1f2a44]">Manage Jobs</h2>

          <div className="mt-4 space-y-3">
            {sortedJobs.length === 0 ? (
              <p className="text-sm text-slate-500">No jobs available.</p>
            ) : (
              sortedJobs.map((job) => (
                <article key={job.id} className="rounded-xl border border-slate-200 p-3">
                  <h3 className="font-semibold text-[#1f2a44]">{job.title}</h3>
                  <p className="text-xs text-slate-500">
                    {job.company} · {job.location} · {job.category}
                  </p>

                  <button
                    type="button"
                    onClick={() => onDeleteJob(job.id)}
                    className="mt-2 rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
