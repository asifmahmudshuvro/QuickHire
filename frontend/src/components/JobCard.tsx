import type { Job } from "@/types";
import Link from "next/link";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <article className="rounded-2xl border border-[#e5e8f6] bg-white p-5 shadow-[0_8px_20px_rgba(79,70,229,0.06)] transition hover:shadow-[0_14px_28px_rgba(79,70,229,0.12)]">
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#4f46e5]">
          {job.category}
        </span>
        <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#4f46e5]">
          {job.location}
        </span>
      </div>

      <h2 className="text-lg font-extrabold text-[#1f2a44]">{job.title}</h2>
      <p className="mt-1 text-sm font-medium text-slate-500">{job.company}</p>

      <p className="mt-3 line-clamp-3 text-sm text-slate-600">{job.description}</p>

      <div className="mt-4">
        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
