export default function CTA() {
  return (
    <section className="rounded-3xl border border-emerald-100 bg-emerald-50 px-6 py-10 shadow-sm md:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Ready to see it?
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Talk and understand how it works.
          </h2>
          <p className="text-slate-700">
            We&apos;ll set up your website, connect everything, and email you
            every lead. No subscriptions, no surprises.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="#chat"
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            See if this is right for your business
          </a>
          <a
            href="mailto:hello@intervieway.com"
            className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}
