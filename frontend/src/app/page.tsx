import type { Job } from "@/types";
import { HeroCandidateImage } from "@/components/HeroCandidateImage";
import { getJobs } from "@/lib/api";
import Link from "next/link";

type HomeProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    location?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";
  const location = params.location?.trim() ?? "";

  const allJobs = await getJobs();
  const jobs = await getJobs({ search, location });
  const locations = [...new Set(allJobs.map((job) => job.location))].sort();

  const categoryCards = [
    { title: "Design", icon: "✎" },
    { title: "Sales", icon: "◔" },
    { title: "Marketing", icon: "📣" },
    { title: "Finance", icon: "▣" },
    { title: "Technology", icon: "⌘" },
    { title: "Engineering", icon: "</>" },
    { title: "Business", icon: "⌂" },
    { title: "Human Resource", icon: "◉" },
  ];

  const companyLogos = [
    { name: "Vodafone", src: "https://logo.clearbit.com/vodafone.com" },
    { name: "Intel", src: "https://logo.clearbit.com/intel.com" },
    { name: "Tesla", src: "https://logo.clearbit.com/tesla.com" },
    { name: "AMD", src: "https://logo.clearbit.com/amd.com" },
    { name: "Talkit", src: "https://logo.clearbit.com/talkit.com" },
  ];

  const categoryCountMap = allJobs.reduce<Record<string, number>>((accumulator, job) => {
    const key = job.category.trim().toLowerCase();
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});

  const featuredJobs = fillJobs(jobs, 8);
  const latestJobs = fillJobs(jobs, 8);

  const mobileLatestJobs = [...latestJobs].sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen bg-[#f5f6fb] text-slate-800 max-[390px]:overflow-x-hidden">
      <section className="relative overflow-hidden bg-[#f3f4fb]">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 max-[390px]:px-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-extrabold leading-none text-[#4f46e5]">
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#4f46e5]">
                <span className="h-4 w-4 rounded-full border-2 border-white" />
                <span className="absolute right-[3px] top-[3px] h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <span className="text-[30px] font-extrabold tracking-tight text-[#1f2a44]">QuickHire</span>
            </Link>

            <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-500 lg:flex">
              <Link href="/jobs" className="hover:text-[#1f2a44]">
                Find Jobs
              </Link>
              <a href="#companies" className="hover:text-[#1f2a44]">
                Browse Companies
              </a>
            </nav>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <Link href="/admin" className="text-sm font-semibold text-[#4f46e5]">
              Login
            </Link>
            <Link href="/admin" className="rounded-sm bg-[#4f46e5] px-6 py-2.5 text-sm font-semibold text-white">
              Sign Up
            </Link>
          </div>

          <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 lg:hidden" aria-label="Open menu">
            ☰
          </button>
        </header>

        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-11 pt-2 max-[390px]:gap-6 max-[390px]:px-3 max-[390px]:pb-9 max-[390px]:pt-1 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8 lg:pb-20">
          <div>
            <h1 className="text-[54px] font-extrabold leading-[0.94] tracking-[-0.02em] text-[#1f2a44] max-[390px]:text-[49px] max-[390px]:leading-[0.93] sm:text-[60px] lg:text-[74px]">
              Discover
              <br />
              more than
              <br />
              <span className="text-[#30a7ff]">5000+ Jobs</span>
            </h1>
            <svg viewBox="0 0 500 26" className="mt-3 h-4 w-[280px] text-[#30a7ff] sm:w-[350px]" fill="none" aria-hidden>
              <path d="M7 10C130 4 252 2 493 8" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              <path d="M3 18C129 12 252 10 487 15" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.92" />
            </svg>
            <p className="mt-4 max-w-md text-[13px] leading-[1.55] text-slate-500 max-[390px]:text-[12px] max-[390px]:leading-[1.5] sm:mt-5 sm:text-[15px] sm:leading-6">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>

            <form action="/jobs" method="GET" className="mt-6 grid gap-2 rounded-sm border border-[#e6e8f4] bg-white p-2.5 max-[390px]:p-[7px] sm:mt-7 sm:grid-cols-[1fr_220px_240px]">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
                <input
                  name="search"
                  defaultValue={search}
                  placeholder="Job title or keyword"
                  className="h-10 w-full border-b border-slate-200 bg-transparent pl-9 pr-3 text-sm text-slate-600 outline-none max-[390px]:h-[38px] max-[390px]:text-[13px] sm:h-11"
                />
              </div>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M12 21s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
                <select
                  name="location"
                  defaultValue={location}
                  className="h-10 w-full appearance-none border-b border-slate-200 bg-transparent pl-9 pr-8 text-sm text-slate-600 outline-none max-[390px]:h-[38px] max-[390px]:text-[13px] sm:h-11"
                >
                  <option value="">All locations</option>
                  {locations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="h-10 rounded-sm bg-[#4f46e5] text-base font-semibold text-white transition hover:bg-[#4338ca] max-[390px]:h-[38px] max-[390px]:text-[13px] sm:h-11">
                Search my job
              </button>
            </form>

            <p className="mt-3 text-xs text-slate-500 max-[390px]:text-[11px]">Popular: UI Designer, UX Researcher, Android, Admin</p>
          </div>

          <div className="relative hidden h-[540px] overflow-hidden lg:block">
            <div
              className="absolute inset-0 opacity-90"
              aria-hidden
              style={{
                backgroundImage:
                  "linear-gradient(153deg, transparent 63%, rgba(99,102,241,0.26) 63%, rgba(99,102,241,0.26) 64%, transparent 64%), linear-gradient(153deg, transparent 78%, rgba(99,102,241,0.2) 78%, rgba(99,102,241,0.2) 79%, transparent 79%)",
                backgroundSize: "100% 100%, 72% 72%",
                backgroundPosition: "right top, right 24px top 74px",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="absolute right-2 bottom-0 z-20 h-[510px] w-[372px]">
              <HeroCandidateImage />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-28 -right-10 hidden h-52 w-[44%] rotate-[-25deg] bg-white lg:block" />
      </section>

      <main className="mx-auto w-full max-w-6xl px-4 py-9 max-[390px]:px-3 max-[390px]:py-8 sm:px-6 lg:px-8">
        <section id="companies">
          <p className="text-sm text-slate-500">Companies we helped grow</p>
          <div className="mt-5 grid grid-cols-3 items-center gap-5 sm:grid-cols-5">
            {companyLogos.map((company) => (
              <div key={company.name} className="flex h-10 items-center justify-center sm:h-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={company.src}
                  alt={company.name}
                  className="max-h-8 w-auto object-contain opacity-45 grayscale transition hover:opacity-70"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 max-[390px]:mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[34px] font-extrabold tracking-tight text-[#1f2a44] max-[390px]:text-[30px] sm:text-[44px]">
              Explore by <span className="text-[#30a7ff]">category</span>
            </h2>
            <Link href="/jobs" className="hidden text-sm font-semibold text-[#4f46e5] sm:inline-block">
              Show all jobs →
            </Link>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((item) => {
              const categoryCount = categoryCountMap[item.title.toLowerCase()] ?? 0;
              return (
                <a
                  key={item.title}
                  href={`/jobs?category=${encodeURIComponent(item.title)}`}
                  className="group min-h-[138px] rounded border border-slate-200 bg-white p-4 text-[#1f2a44] transition max-[390px]:min-h-[128px] max-[390px]:p-3.5 hover:border-[#4f46e5] hover:bg-[#4f46e5] hover:text-white focus-visible:border-[#4f46e5] focus-visible:bg-[#4f46e5] focus-visible:text-white sm:min-h-[150px] sm:p-5"
                >
                  <p className="text-lg font-bold">{item.icon}</p>
                  <h3 className="mt-4 text-[21px] font-extrabold max-[390px]:mt-3.5 max-[390px]:text-[19px] sm:mt-6 sm:text-xl">{item.title}</h3>
                  <p className="mt-1 text-[13px] text-slate-500 max-[390px]:text-[12px] group-hover:text-white/90 group-focus-visible:text-white/90 sm:mt-2 sm:text-sm">
                    {categoryCount} {categoryCount === 1 ? "job" : "jobs"} available
                  </p>
                </a>
              );
            })}
          </div>

          <Link href="/jobs" className="mt-4 inline-block text-sm font-semibold text-[#4f46e5] sm:hidden">
            Show all jobs →
          </Link>
        </section>

        <section className="mt-14 overflow-hidden rounded bg-[#4f46e5] text-white max-[390px]:mt-12">
          <div className="grid gap-6 p-8 max-[390px]:gap-4 max-[390px]:p-6 lg:grid-cols-[1fr_1.1fr] lg:p-10">
            <div>
              <h3 className="text-[42px] font-extrabold leading-[1.02] tracking-tight max-[390px]:text-[41px] max-[390px]:leading-[1.03]">Start posting jobs today</h3>
              <p className="mt-3 text-sm text-white/85 max-[390px]:text-[12px]">Start posting jobs for only $10.</p>
              <Link href="/admin" className="mt-6 inline-flex rounded bg-white px-5 py-3 text-sm font-semibold text-[#4f46e5] max-[390px]:mt-4 max-[390px]:w-full max-[390px]:justify-center max-[390px]:py-2.5 max-[390px]:text-[13px]">
                Sign Up For Free
              </Link>
            </div>

            <div className="rounded bg-white/95 p-4 text-slate-800">
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-semibold text-slate-500">
                <div className="rounded bg-slate-100 p-3">21,457 jobs</div>
                <div className="rounded bg-slate-100 p-3">158 hires</div>
                <div className="rounded bg-slate-100 p-3">98 teams</div>
              </div>
              <div className="mt-4 h-28 rounded bg-gradient-to-r from-[#4f46e5]/20 via-[#30a7ff]/20 to-[#4f46e5]/20" />
            </div>
          </div>
        </section>

        <section className="mt-14 max-[390px]:mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[34px] font-extrabold tracking-tight text-[#1f2a44] max-[390px]:text-[30px] sm:text-[44px]">
              Featured <span className="text-[#30a7ff]">jobs</span>
            </h2>
            <Link href="/jobs" className="hidden text-sm font-semibold text-[#4f46e5] sm:inline-block">
              Show all jobs →
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-1 max-[390px]:gap-3 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {featuredJobs.map((job, index) => (
              <article key={`featured-${job.id}-${index}`} className="w-[244px] shrink-0 rounded border border-slate-200 bg-white p-4 max-[390px]:w-[220px] max-[390px]:p-3.5 sm:w-auto sm:shrink">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eef2ff] text-xs font-bold text-[#4f46e5]">
                    {job.company.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="rounded border border-[#cbc9ff] px-2 py-1 text-[11px] font-semibold text-[#4f46e5]">Full Time</span>
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-[#1f2a44]">{job.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{job.company} • {job.location}</p>
                <p className="mt-3 text-xs leading-5 text-slate-500">{shortText(job.description, 68)}</p>
                <div className="mt-4 flex gap-2 text-[11px] font-semibold">
                  <span className="rounded-full bg-[#fff4de] px-2 py-1 text-[#e78a00]">Marketing</span>
                  <span className="rounded-full bg-[#ebf9f1] px-2 py-1 text-[#0ea36e]">Design</span>
                </div>
              </article>
            ))}
          </div>

          <Link href="/jobs" className="mt-4 inline-block text-sm font-semibold text-[#4f46e5] sm:hidden">
            Show all jobs →
          </Link>
        </section>

        <section className="mt-14 rounded bg-[#f2f3fb] p-4 max-[390px]:mt-12 max-[390px]:p-3 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[34px] font-extrabold tracking-tight text-[#1f2a44] max-[390px]:text-[30px] sm:text-[44px]">
              Latest <span className="text-[#30a7ff]">jobs open</span>
            </h2>
            <Link href="/jobs" className="hidden text-sm font-semibold text-[#4f46e5] sm:inline-block">
              Show all jobs →
            </Link>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {mobileLatestJobs.map((job, index) => (
              <article key={`latest-${job.id}-${index}`} className="rounded bg-white p-4 max-[390px]:p-3 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ff] text-xs font-bold text-[#4f46e5]">
                    {job.company.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#1f2a44] max-[390px]:text-[17px]">{job.title}</h3>
                    <p className="text-sm text-slate-500 max-[390px]:text-[12px]">{job.company} • {job.location}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold max-[390px]:text-[10px]">
                      <span className="rounded-full bg-[#ebf9f1] px-2 py-1 text-[#0ea36e]">Full-Time</span>
                      <span className="rounded-full bg-[#fff4de] px-2 py-1 text-[#e78a00]">Marketing</span>
                      <span className="rounded-full border border-[#cbc9ff] px-2 py-1 text-[#4f46e5]">Design</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Link href="/jobs" className="mt-4 inline-block text-sm font-semibold text-[#4f46e5] sm:hidden">
            Show all jobs →
          </Link>
        </section>
      </main>

      <footer className="mt-14 bg-[#171d2f] text-white max-[390px]:mt-12">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 max-[390px]:gap-8 max-[390px]:px-3 max-[390px]:py-10 sm:px-6 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr] lg:px-8">
          <div>
            <p className="text-lg font-bold">QuickHire</p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">About</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Companies</li>
              <li>Pricing</li>
              <li>Terms</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Help Docs</li>
              <li>Guide</li>
              <li>Updates</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Get job notifications</h4>
            <p className="mt-3 text-sm text-slate-300">The latest job news, articles, sent to your inbox weekly.</p>
            <form className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input placeholder="Email Address" className="h-10 rounded border border-white/10 bg-white px-3 text-sm text-slate-800 max-[390px]:h-9 max-[390px]:text-[13px]" />
              <button type="button" className="h-10 rounded bg-[#4f46e5] px-4 text-sm font-semibold max-[390px]:h-9 max-[390px]:text-[13px]">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-xs text-slate-400 max-[390px]:px-3 sm:px-6 lg:px-8">
            <p>2026 © QuickHire. All rights reserved.</p>
            <p>● ● ● ● ●</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function shortText(value: string, limit: number): string {
  if (value.length <= limit) {
    return value;
  }

  return `${value.slice(0, limit).trim()}...`;
}

function fillJobs(jobs: Job[], limit: number): Job[] {
  if (jobs.length === 0) {
    return [];
  }

  const pool = [...jobs, ...jobs, ...jobs, ...jobs];

  return pool.slice(0, limit);
}
