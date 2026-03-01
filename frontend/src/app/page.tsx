import type { Job } from "@/types";
import { HeroCandidateImage } from "@/components/HeroCandidateImage";
import { UserAuthMenu } from "@/components/UserAuthMenu";
import { getCompanyLogo } from "@/lib/companyLogo";
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
    { title: "Design", icon: "design" },
    { title: "Sales", icon: "sales" },
    { title: "Marketing", icon: "marketing" },
    { title: "Finance", icon: "finance" },
    { title: "Technology", icon: "technology" },
    { title: "Engineering", icon: "engineering" },
    { title: "Business", icon: "business" },
    { title: "Human Resource", icon: "hr" },
  ];

  const companyLogos = [
    { name: "Vodafone", src: "/vodafone-2017-logo.png" },
    { name: "Intel", src: "/intel-3.png" },
    { name: "Tesla", src: "/tesla-9%201.png" },
    { name: "AMD", src: "/amd-logo-1.png" },
    { name: "Talkit", src: "/talkit%201.png" },
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
        <div
          className="pointer-events-none absolute inset-y-0 right-[-90px] w-[86%] opacity-20 lg:hidden"
          aria-hidden
          style={{
            backgroundImage: "url('/Pattern.png')",
            backgroundSize: "cover",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 max-[390px]:px-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-extrabold leading-none text-[#4f46e5]">
              <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#4f46e5] sm:h-6 sm:w-6">
                <span className="h-3 w-3 rounded-full border-2 border-white sm:h-3.5 sm:w-3.5" />
                <span className="absolute right-[3px] top-[3px] h-1 w-1 rounded-full bg-white sm:h-1.5 sm:w-1.5" />
              </span>
              <span className="text-base font-extrabold tracking-tight text-[#1f2a44] sm:text-[24px]">QuickHire</span>
            </Link>

            <nav className="hidden items-center gap-7 text-[13px] font-semibold text-slate-500 lg:flex">
              <Link href="/jobs" className="hover:text-[#1f2a44]">
                Find Jobs
              </Link>
              <Link href="/#companies" className="hover:text-[#1f2a44]">
                Browse Companies
              </Link>
            </nav>
          </div>

          <UserAuthMenu />

          <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 lg:hidden" aria-label="Open menu">
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

            <form action="/jobs" method="GET" className="relative z-30 mt-6 grid max-w-[860px] overflow-hidden rounded-sm border border-[#e6e8f4] bg-white max-[390px]:mt-5 sm:mt-7 lg:w-[860px] lg:max-w-none lg:grid-cols-[1fr_220px_232px] lg:p-2">
              <div className="relative px-2 max-[390px]:px-[7px] lg:border-r lg:border-[#e8ebf6] lg:px-4">
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
                  className="h-11 w-full border-b border-slate-200 bg-transparent pl-9 pr-3 text-sm text-slate-600 outline-none max-[390px]:h-[38px] max-[390px]:text-[13px] lg:h-[60px] lg:border-0"
                />
              </div>

              <div className="relative px-2 max-[390px]:px-[7px] lg:border-r lg:border-[#e8ebf6] lg:px-4">
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
                  defaultValue={location || "Florence, Italy"}
                  className="h-11 w-full appearance-none border-b border-slate-200 bg-transparent pl-9 pr-8 text-sm text-slate-600 outline-none max-[390px]:h-[38px] max-[390px]:text-[13px] lg:h-[62px] lg:border-0"
                >
                  <option value="Florence, Italy">Florence, Italy</option>
                  <option value="">All locations</option>
                  {locations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="h-11 rounded-sm bg-[#4f46e5] text-sm font-semibold text-white transition hover:bg-[#4338ca] max-[390px]:mx-[7px] max-[390px]:mb-[7px] max-[390px]:h-[38px] max-[390px]:text-[13px] lg:m-0 lg:h-[60px] lg:text-[16px] lg:font-semibold">
                Search my job
              </button>
            </form>

            <p className="mt-3 text-xs text-slate-500 max-[390px]:text-[11px]">Popular: UI Designer, UX Researcher, Android, Admin</p>
          </div>

          <div className="relative z-10 hidden h-[540px] overflow-visible lg:block">
            <div
              className="absolute right-0 top-0 h-full w-[58%] opacity-48"
              aria-hidden
              style={{
                backgroundImage: "url('/Pattern.png')",
                backgroundSize: "contain",
                backgroundPosition: "right top",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div
              className="absolute right-0 bottom-0 z-20 h-[520px] w-[390px] overflow-hidden"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 45% 100%, 0 100%)" }}
            >
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
                  className="group rounded border border-slate-200 bg-white p-4 text-[#1f2a44] transition hover:border-[#4f46e5] hover:bg-[#4f46e5] hover:text-white focus-visible:border-[#4f46e5] focus-visible:bg-[#4f46e5] focus-visible:text-white max-[390px]:p-3.5 sm:min-h-[150px] sm:p-5"
                >
                  <div className="flex items-center gap-4 sm:block">
                    <CategoryIcon
                      name={item.icon}
                      className="h-8 w-8 shrink-0 text-[#4f46e5] group-hover:text-white group-focus-visible:text-white sm:h-10 sm:w-10"
                    />

                    <div className="min-w-0 flex-1 sm:mt-6">
                      <h3 className="text-[21px] font-extrabold max-[390px]:text-[20px] sm:text-xl">{item.title}</h3>
                      <p className="mt-1 text-[13px] text-slate-500 group-hover:text-white/90 group-focus-visible:text-white/90 max-[390px]:text-[12px] sm:flex sm:items-center sm:justify-between sm:gap-2 sm:text-sm">
                        <span>
                          {categoryCount} {categoryCount === 1 ? "job" : "jobs"} available
                        </span>
                        <svg
                          aria-hidden
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="hidden h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 sm:inline-block"
                        >
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </p>
                    </div>

                    <svg
                      aria-hidden
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 shrink-0 sm:hidden"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>

          <Link href="/jobs" className="mt-4 inline-block text-sm font-semibold text-[#4f46e5] sm:hidden">
            Show all jobs →
          </Link>
        </section>

        <section className="relative mt-14 overflow-hidden max-[390px]:mt-12">
          <div
            className="relative bg-[#4f46e5] text-white max-[390px]:px-0"
            style={{ clipPath: "polygon(8.5% 0, 100% 0, 100% 76%, 86% 100%, 0 100%, 0 18%)" }}
          >

            <div className="grid items-center gap-6 p-8 max-[390px]:gap-4 max-[390px]:p-6 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-8 lg:px-12 lg:py-10">
              <div className="lg:pl-2">
                <h3 className="text-[42px] font-extrabold leading-[1.02] tracking-tight max-[390px]:text-[41px] max-[390px]:leading-[1.03] lg:text-[52px]">
                  Start posting
                  <br />
                  jobs today
                </h3>
                <p className="mt-4 text-sm text-white/90 max-[390px]:text-[12px]">Start posting jobs for only $10.</p>
                <Link href="/signup" className="mt-6 inline-flex rounded-sm bg-white px-5 py-3 text-sm font-semibold text-[#4f46e5] max-[390px]:mt-4 max-[390px]:w-full max-[390px]:justify-center max-[390px]:py-2.5 max-[390px]:text-[13px]">
                  Sign Up For Free
                </Link>
              </div>

              <div className="relative z-10">
                <div className="overflow-hidden rounded-sm border border-white/15 bg-white/95 p-1 shadow-[0_20px_40px_rgba(19,23,46,0.28)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/3.1%20Dashboard%20Company.png"
                    alt="Dashboard preview"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
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
              <Link
                key={`featured-${job.id}-${index}`}
                href={`/jobs/${job.id}`}
                className="block w-[244px] shrink-0 rounded border border-slate-200 bg-white p-4 transition hover:border-[#4f46e5] max-[390px]:w-[220px] max-[390px]:p-3.5 sm:w-auto sm:shrink"
              >
                <article>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-[#e5e8f6]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getCompanyLogo(job.company)} alt={`${job.company} logo`} className="h-7 w-7 object-contain" loading="lazy" />
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
              </Link>
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

          <div className="flex flex-col gap-3 overflow-x-hidden lg:grid lg:grid-cols-2">
            {mobileLatestJobs.map((job, index) => (
              <Link
                key={`latest-${job.id}-${index}`}
                href={`/jobs/${job.id}`}
                className="block w-full min-w-0 rounded bg-white p-4 transition hover:ring-1 hover:ring-[#4f46e5]/35 max-[390px]:p-3 sm:p-5"
              >
                <article>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-[#e5e8f6]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getCompanyLogo(job.company)} alt={`${job.company} logo`} className="h-8 w-8 object-contain" loading="lazy" />
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
              </Link>
            ))}
          </div>

          <Link href="/jobs" className="mt-4 inline-block text-sm font-semibold text-[#4f46e5] sm:hidden">
            Show all jobs →
          </Link>
        </section>
      </main>

      <footer className="mt-14 bg-[#1f2538] text-white max-[390px]:mt-12">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-[1.25fr_0.7fr_0.7fr_1fr] lg:gap-10">
            <div className="col-span-2 lg:col-span-1">
              <div className="inline-flex items-center gap-2.5">
                <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#4f46e5]">
                  <span className="h-4 w-4 rounded-full border-2 border-white" />
                  <span className="absolute right-[4px] top-[4px] h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span className="text-[38px] font-extrabold leading-none tracking-tight text-white">QuickHire</span>
              </div>
              <p className="mt-6 max-w-sm text-[15px] leading-8 text-[#c2c8d6]">
                Great platform for the job seeker that passionate about startups. Find your dream job easier.
              </p>
            </div>

            <div className="col-span-1 lg:col-span-1">
              <h4 className="text-[18px] font-semibold text-white">About</h4>
              <ul className="mt-5 space-y-3 text-[16px] text-[#c2c8d6]">
                <li>Companies</li>
                <li>Pricing</li>
                <li>Terms</li>
                <li>Advice</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div className="col-span-1 lg:col-span-1">
              <h4 className="text-[18px] font-semibold text-white">Resources</h4>
              <ul className="mt-5 space-y-3 text-[16px] text-[#c2c8d6]">
                <li>Help Docs</li>
                <li>Guide</li>
                <li>Updates</li>
                <li>Contact Us</li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <h4 className="text-[18px] font-semibold text-white">Get job notifications</h4>
              <p className="mt-5 max-w-sm text-[16px] leading-[1.55] text-[#c2c8d6]">
                The latest job news, articles, sent to your inbox weekly.
              </p>
              <form className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  placeholder="Email Address"
                  className="h-11 w-full rounded-none border-0 bg-[#f2f3f7] px-4 text-[14px] text-slate-700 placeholder:text-[#9aa2b3] sm:h-12 sm:max-w-[260px] sm:text-base"
                />
                <button type="button" className="h-11 self-start rounded-none bg-[#4f46e5] px-6 text-[16px] font-semibold text-white sm:h-12 sm:text-base">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 sm:pt-7">
            <div className="flex flex-col items-center gap-4 text-center text-[#9ea6b8] sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <p className="text-[15px]">2021 @ QuickHire. All rights reserved.</p>
              <div className="flex items-center gap-4 sm:gap-3">
                <a href="#" aria-label="Facebook" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#32394d] text-[#eef1f7] transition hover:bg-[#3e475f]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M13.5 8H16V5h-2.5C11.3 5 10 6.3 10 8.5V10H8v3h2v6h3v-6h2.4l.6-3H13V8.7c0-.5.2-.7.5-.7Z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#32394d] text-[#eef1f7] transition hover:bg-[#3e475f]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-3.5 w-3.5">
                    <rect x="4" y="4" width="16" height="16" rx="5" />
                    <circle cx="12" cy="12" r="3.5" />
                    <circle cx="16.8" cy="7.2" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" aria-label="Dribbble" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#32394d] text-[#eef1f7] transition hover:bg-[#3e475f]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-3.5 w-3.5">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M7 8.5c3.2 1.1 7.9 1.2 10.8 0" />
                    <path d="M8.4 17c1-2.2 3.3-5.1 6.8-6.6" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#32394d] text-[#eef1f7] transition hover:bg-[#3e475f]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M6.3 8.1a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6ZM4.8 9.7h3V19h-3V9.7Zm5 0h2.9V11c.4-.8 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7V19h-3v-4.1c0-1-.1-2.3-1.5-2.3s-1.7 1.1-1.7 2.2V19h-3V9.7Z" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#32394d] text-[#eef1f7] transition hover:bg-[#3e475f]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M19.2 7.2c-.5.2-1 .3-1.5.4.5-.3 1-.8 1.2-1.4-.5.3-1.1.5-1.7.7a2.7 2.7 0 0 0-4.6 2.5A7.7 7.7 0 0 1 7 6.7a2.7 2.7 0 0 0 .8 3.6c-.4 0-.8-.1-1.2-.3v.1c0 1.3.9 2.5 2.2 2.7-.2.1-.5.1-.7.1-.2 0-.3 0-.5-.1.3 1.1 1.4 1.9 2.6 1.9A5.5 5.5 0 0 1 6 16.2a7.7 7.7 0 0 0 4.2 1.2c5 0 7.8-4.1 7.8-7.8v-.3c.5-.4.9-.8 1.2-1.4Z" />
                  </svg>
                </a>
              </div>
            </div>
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

function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const baseProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    className,
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "design":
      return (
        <svg {...baseProps}>
          <path d="m4 20 7-7" />
          <path d="m14 6 4 4" />
          <path d="m10 4 10 10" />
          <path d="m3 21 4-1 13-13-3-3L4 17l-1 4Z" />
        </svg>
      );
    case "sales":
      return (
        <svg {...baseProps}>
          <path d="M5 20V10" />
          <path d="M10 20V5" />
          <path d="M15 20v-7" />
          <path d="M20 20V8" />
          <circle cx="7" cy="6" r="2" />
        </svg>
      );
    case "marketing":
      return (
        <svg {...baseProps}>
          <path d="M4 13V9l11-4v12L4 13Z" />
          <path d="M15 10h3a2 2 0 0 1 0 4h-3" />
          <path d="m7 13 1.5 5" />
        </svg>
      );
    case "finance":
      return (
        <svg {...baseProps}>
          <rect x="3" y="7" width="18" height="12" rx="2" />
          <path d="M3 11h18" />
          <path d="M7 15h3" />
        </svg>
      );
    case "technology":
      return (
        <svg {...baseProps}>
          <rect x="4" y="4" width="16" height="12" rx="2" />
          <path d="M9 20h6" />
          <path d="M12 16v4" />
        </svg>
      );
    case "engineering":
      return (
        <svg {...baseProps}>
          <path d="m8 7-4 5 4 5" />
          <path d="m16 7 4 5-4 5" />
          <path d="m14 5-4 14" />
        </svg>
      );
    case "business":
      return (
        <svg {...baseProps}>
          <rect x="4" y="6" width="16" height="14" rx="2" />
          <path d="M9 6V4h6v2" />
          <path d="M4 12h16" />
        </svg>
      );
    default:
      return (
        <svg {...baseProps}>
          <circle cx="8" cy="9" r="2.5" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M3 20a5 5 0 0 1 10 0" />
          <path d="M11 20a5 5 0 0 1 10 0" />
        </svg>
      );
  }
}
