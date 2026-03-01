import { AdminJobsManager } from "@/components/AdminJobsManager";
import { AppHeader } from "@/components/AppHeader";
import { getJobs } from "@/lib/api";

export default async function AdminPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      <AppHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1f2a44]">Admin Panel</h1>
          <p className="mt-2 text-sm text-slate-500">Authenticated admins can create and manage job listings.</p>
        </section>

        <AdminJobsManager initialJobs={jobs} />
      </main>
    </div>
  );
}
