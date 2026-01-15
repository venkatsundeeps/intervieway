const ownershipItems = [
  { title: "Website", detail: "You fully own the website and domain." },
  { title: "Hosting", detail: "Host wherever you like. We set it up, you control it." },
  { title: "AI API Key", detail: "Use your own OpenAI or Gemini key. We never hardcode keys." },
  { title: "Data", detail: "Chats and leads are yours. We don't keep or sell your data." },
];

const promises = [
  "One-time setup and clear handover",
  "No vendor lock-in or hidden recurring charges",
  "Simple training so you can manage it yourself",
];

export default function Ownership() {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10" id="ownership">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Ownership & Trust</p>
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">You own everything we set up.</h2>
        <p className="text-slate-600 md:text-lg">
          Intervieway is a one-time setup partner. We build, configure, and then hand over everything—you fully own it.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ownershipItems.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-inner">
            <p className="text-base font-semibold text-slate-900">{item.title}</p>
            <p className="text-sm text-slate-700">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 text-sm text-emerald-900 shadow-inner">
        <p className="font-semibold">Our promise:</p>
        <ul className="mt-2 space-y-2">
          {promises.map((promise) => (
            <li key={promise} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              <span>{promise}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
