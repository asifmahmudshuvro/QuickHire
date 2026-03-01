import { AppHeader } from "@/components/AppHeader";
import { JobCard } from "@/components/JobCard";
import { JobFilters } from "@/components/JobFilters";
import { getJobs } from "@/lib/api";

type JobsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    location?: string;
  }>;
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;

  const search = params.search?.trim() ?? "";
  const category = params.category?.trim() ?? "";
  const location = params.location?.trim() ?? "";

  const allJobs = await getJobs();
  const jobs = await getJobs({ search, category, location });

  const categories = [...new Set(allJobs.map((job) => job.category))].sort();
  const locations = [...new Set(allJobs.map((job) => job.location))].sort();

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      <AppHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1f2a44]">Job Listings</h1>
          <p className="mt-2 text-sm text-slate-500">
            Browse all openings, search by keyword, and filter by category and location.
          </p>
        </section>

        <JobFilters
          actionPath="/jobs"
          initialSearch={search}
          initialCategory={category}
          initialLocation={location}
          categories={categories}
          locations={locations}
        />

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.length === 0 ? (
            <p className="col-span-full rounded-2xl border border-[#e5e8f6] bg-white p-6 text-sm text-slate-500">
              No jobs match your current filters.
            </p>
          ) : (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </section>
      </main>
    </div>
  );
}
