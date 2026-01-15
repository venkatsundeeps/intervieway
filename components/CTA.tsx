export default function CTA() {
  return (
    <section className="rounded-3xl border border-blue-100 bg-blue-50 px-6 py-10 shadow-sm md:px-10">
      <div className="flex flex-col gap-6 items-center text-center">
        <div className="space-y-3 max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Ready to turn visitors into enquiries?
          </h2>
          <a
            href="#chat"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            👉 Show Me How It Works (Free Demo)
          </a>
          <p className="text-sm text-slate-600">
            Takes less than 1 minute • No obligation
          </p>
        </div>
      </div>
    </section>
  );
}
