const steps = [
  {
    title: "Visitor starts chat",
    detail: "Floating widget greets them and asks simple questions one at a time.",
  },
  {
    title: "AI understands needs",
    detail: "Short, friendly replies—no jargon. It checks for business type, goals, and key details.",
  },
  {
    title: "Lead details collected",
    detail: "Name, email, and optional phone are requested only after context is clear.",
  },
  {
    title: "You get an email",
    detail: "Conversation summary and contact info are sent to your inbox automatically.",
  },
];

const flow = [
  "User chats in the widget",
  "AI captures answers",
  "Details saved & emailed",
  "You follow up quickly",
];

export default function HowItWorks() {
  return (
    <section className="space-y-8 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10" id="how-it-works">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">How it works</p>
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">A simple, guided flow for your visitors.</h2>
        <p className="text-slate-600 md:text-lg">
          The chatbot keeps replies short, asks up to five questions, then collects contact details and confirms the plan.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-inner">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                {index + 1}
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-slate-900">{step.title}</p>
                <p className="text-sm text-slate-700">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6 shadow-inner">
          <h3 className="text-lg font-semibold text-slate-900">Simple automation flow</h3>
          <p className="mt-2 text-sm text-slate-700">
            No complex CRM. We save the conversation, log it, and email you the details—ready for follow-up.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {flow.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/60 bg-white p-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <p className="text-sm text-slate-800">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-emerald-100 bg-white/80 p-4 text-sm text-emerald-800">
            ✅ We set it up once and hand it over. You own hosting, API keys, and data.
          </div>
        </div>
      </div>
    </section>
  );
}

