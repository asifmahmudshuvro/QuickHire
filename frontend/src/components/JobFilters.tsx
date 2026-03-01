type JobFiltersProps = {
  actionPath?: string;
  initialSearch?: string;
  initialCategory?: string;
  initialLocation?: string;
  categories: string[];
  locations: string[];
};

export function JobFilters({
  actionPath = "/jobs",
  initialSearch,
  initialCategory,
  initialLocation,
  categories,
  locations,
}: JobFiltersProps) {
  return (
    <form
      action={actionPath}
      method="GET"
      className="grid gap-3 rounded-2xl border border-[#e5e8f6] bg-white p-4 shadow-[0_10px_24px_rgba(79,70,229,0.06)] sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>
        <input
          name="search"
          defaultValue={initialSearch}
          placeholder="Search title, company, keywords"
          className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-600"
        />
      </div>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M4 7h16" />
            <path d="M7 12h10" />
            <path d="M10 17h4" />
          </svg>
        </span>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
        <select
          name="category"
          defaultValue={initialCategory ?? ""}
          className="w-full appearance-none rounded-xl border border-slate-200 py-2 pl-9 pr-8 text-sm text-slate-600"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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
          defaultValue={initialLocation ?? ""}
          className="w-full appearance-none rounded-xl border border-slate-200 py-2 pl-9 pr-8 text-sm text-slate-600"
        >
          <option value="">All locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
      >
        Apply Filters
      </button>
    </form>
  );
}
