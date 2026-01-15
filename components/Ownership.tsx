const ownershipItems = [
  { title: "One-time setup", detail: "We set it up once and hand it over to you." },
  { title: "No monthly fees", detail: "You pay once, then it's yours forever." },
  { title: "You own everything", detail: "Nothing is locked to us. You fully own it." },
  { title: "We handle setup for you", detail: "This is a done-for-you service — not software." },
];

export default function Ownership() {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10" id="ownership">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Trust & Ownership</p>
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Simple, honest, and yours forever.</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ownershipItems.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-inner">
            <p className="text-base font-semibold text-slate-900">{item.title}</p>
            <p className="text-sm text-slate-700 mt-1">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-6 text-center">
        <p className="text-lg font-bold text-emerald-900">
          This is a done-for-you service — not software.
        </p>
      </div>
    </section>
  );
}
