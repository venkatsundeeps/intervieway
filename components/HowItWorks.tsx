const steps = [
  {
    title: "Visitor opens your website",
    detail: "A friendly chat window appears and greets them naturally.",
  },
  {
    title: "Friendly AI chat asks simple questions",
    detail: "One question at a time, in plain language. No confusing forms or technical terms.",
  },
  {
    title: "You receive the visitor's contact details automatically",
    detail: "Name, email, and their answers arrive in your inbox ready for follow-up.",
  },
];

export default function HowItWorks() {
  return (
    <section className="space-y-8 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10" id="how-it-works">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">How it works</p>
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Three simple steps to capture more leads.</h2>
        <p className="text-slate-600 md:text-lg">
          No complicated setup. No technical knowledge required. Just a simple conversation that turns visitors into customers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-inner">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-700">
              {index + 1}
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-slate-900">{step.title}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
