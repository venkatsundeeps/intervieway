import CTA from "@/components/CTA";
import ChatWidget from "@/components/ChatWidget";
import VoiceButton from "@/components/VoiceButton";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Ownership from "@/components/Ownership";

export default function Home() {
  return (
    <main className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:py-14">
      <Hero />
      <Features />

      <section
        className="grid gap-6 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:grid-cols-2 md:px-10"
        id="live-demo"
      >
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Live chatbot experience
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            See how visitors will talk to you.
          </h2>
          <p className="text-slate-600 md:text-lg">
            The floating widget opens automatically, greets visitors, asks up to
            five simple questions, then collects a name and email. You can
            switch between OpenAI and Gemini via environment settings—keys are
            always yours.
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              Auto-open after a few seconds to invite a chat.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              Guided, one-question-at-a-time flow with short replies.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              Collects name, email, and optional phone, then sends to your
              inbox.
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <a
              href="#chat"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              Try the chatbot
            </a>
            <a
              href="#ownership"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-200 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              What you own
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-inner">
          <div className="space-y-3 text-sm text-slate-700">
            <p className="text-base font-semibold text-slate-900">
              What you’ll see:
            </p>
            <p>• Floating button on the bottom right (auto-opens to greet).</p>
            <p>• Friendly, professional replies with no jargon.</p>
            <p>• Up to five focused questions, then contact capture.</p>
            <p>• Every lead emailed to you—no extra dashboards.</p>
          </div>
          <div className="mt-4 rounded-xl border border-emerald-100 bg-white p-4 text-xs text-emerald-900">
            Tip: Open the widget now to experience the exact flow your visitors
            get.
          </div>
        </div>
      </section>

      <HowItWorks />
      <Ownership />
      <CTA />
      <ChatWidget />
      <VoiceButton />
    </main>
  );
}
