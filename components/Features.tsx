export default function Features() {
  return (
    <section className="space-y-8 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10" id="features">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          The problem and the solution
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-inner">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">The Problem</h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-rose-400" />
              <span>Visitors come to your website</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-rose-400" />
              <span>They leave without contacting you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-rose-400" />
              <span>You lose potential customers</span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 shadow-inner">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">The Solution</h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
              <span>Visitors get instant answers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
              <span>They feel confident</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
              <span>They contact you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
              <span>You get more enquiries</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
