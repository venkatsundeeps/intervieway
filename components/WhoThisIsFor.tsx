const goodFor = [
  "Local service businesses (plumbers, electricians, cleaners)",
  "Coaches and consultants",
  "Small agencies and freelancers",
  "Anyone who needs more customer enquiries",
];

const notFor = [
  "People looking for custom software development",
  "Businesses needing complex dashboards or analytics",
  "Companies that want ongoing monthly support contracts",
  "Anyone who needs enterprise-level features",
];

export default function WhoThisIsFor() {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10" id="who-this-is-for">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Who this is for</p>
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Help us both save time.</h2>
        <p className="text-slate-600 md:text-lg">
          This works best for businesses that want a simple way to capture leads. If you need something more complex, we're probably not the right fit.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 shadow-inner">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">✅ Good for:</h3>
          <ul className="space-y-3 text-slate-700">
            {goodFor.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-inner">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">❌ Not for:</h3>
          <ul className="space-y-3 text-slate-700">
            {notFor.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-slate-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
