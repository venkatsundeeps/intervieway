export default function ChatExperience() {
  return (
    <section
      className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10"
      id="chat-experience"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          How the chat helps you get enquiries
        </h2>
        <div className="space-y-4 text-lg text-slate-700">
          <p>
            <strong>Visitors chat first (no forms)</strong>
          </p>
          <p>Conversation feels natural</p>
          <p>Contact details are asked only after interest</p>
        </div>
        <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/50 p-6">
          <p className="text-sm font-semibold text-emerald-900 mb-2">
            Example chatbot opening message:
          </p>
          <p className="text-base text-slate-900 italic">
            &quot;Hi 👋 Looking for help or pricing? I can assist you in under 1
            minute.&quot;
          </p>
        </div>
        <div className="pt-2">
          <a
            href="#chat"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-base font-bold text-white shadow-md shadow-emerald-500/30 transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            💬 Chat & Get More Enquiries
          </a>
        </div>
      </div>
    </section>
  );
}
