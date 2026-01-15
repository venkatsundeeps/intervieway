const painPoints = [
  "Visitors browse but don't contact you.",
  "Missed leads when you're busy or offline.",
  "Manual follow-ups that slip through cracks.",
  "No simple system to capture and reply fast.",
];

const solutionSteps = [
  {
    title: "We build your website",
    detail: "Clean, mobile-friendly pages that explain your service in plain language.",
  },
  {
    title: "We add your AI chat",
    detail: "Greets visitors, asks simple questions, and helps them share what they need.",
  },
  {
    title: "Leads go to your inbox",
    detail: "Every conversation and contact detail is sent to the email you choose.",
  },
];

export default function Features() {
  return (
    <section className="space-y-8 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10" id="features">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Why this matters</p>
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Turn missed visitors into ready leads.</h2>
        <p className="text-slate-600 md:text-lg">
          Intervieway is a one-time setup. You get a website and chat that speak simply, collect the right details, and
          hand everything to you.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-inner">
          <h3 className="text-lg font-semibold text-slate-900">Common problems</h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {painPoints.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-rose-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 shadow-inner">
          <h3 className="text-lg font-semibold text-slate-900">Our simple solution</h3>
          <div className="mt-4 space-y-4">
            {solutionSteps.map((step) => (
              <div key={step.title} className="rounded-xl border border-emerald-100 bg-white/70 p-4">
                <p className="text-base font-semibold text-slate-900">{step.title}</p>
                <p className="text-sm text-slate-700">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
