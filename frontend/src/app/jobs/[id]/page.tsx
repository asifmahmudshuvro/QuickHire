import { AppHeader } from "@/components/AppHeader";
import { ApplyForm } from "@/components/ApplyForm";
import { getJobById } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

type JobDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobDetailsPage({ params }: JobDetailsProps) {
  const { id } = await params;
  const job = await getJobById(id).catch(() => null);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      <AppHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/jobs" className="text-sm font-semibold text-[#4f46e5] hover:text-[#4338ca]">
          ← Back to jobs
        </Link>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-2xl border border-[#e5e8f6] bg-white p-6 shadow-[0_8px_20px_rgba(79,70,229,0.06)]">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#4f46e5]">
                {job.category}
              </span>
              <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#4f46e5]">
                {job.location}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-[#1f2a44]">{job.title}</h1>
            <p className="mt-1 text-sm font-medium text-slate-500">{job.company}</p>

            <h2 className="mt-6 text-lg font-semibold text-[#1f2a44]">Job Description</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">{job.description}</p>
          </section>

          <ApplyForm jobId={job.id} />
        </div>
      </main>
    </div>
  );
}
