"use client";

import { submitApplication } from "@/lib/api";
import { useState } from "react";

type ApplyFormProps = {
  jobId: number;
};

export function ApplyForm({ jobId }: ApplyFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      job_id: jobId,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      resume_link: String(formData.get("resume_link") ?? ""),
      cover_note: String(formData.get("cover_note") ?? ""),
    };

    try {
      await submitApplication(payload);
      setSuccess("Application submitted successfully.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-[#e5e8f6] bg-white p-5 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
      <h2 className="text-lg font-semibold text-[#1f2a44]">Apply Now</h2>

      <form action={onSubmit} className="mt-4 space-y-3">
        <input
          name="name"
          placeholder="Full name"
          required
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
        />
        <input
          name="resume_link"
          type="url"
          placeholder="Resume URL"
          required
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
        />
        <textarea
          name="cover_note"
          placeholder="Cover note"
          required
          rows={5}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4338ca] disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-emerald-700">{success}</p> : null}
      </form>
    </section>
  );
}
