"use client";

import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    // Listen for chat widget state changes
    const handleChatOpen = () => setChatOpen(true);
    const handleChatClose = () => setChatOpen(false);
    
    window.addEventListener("chatWidgetOpened", handleChatOpen);
    window.addEventListener("chatWidgetClosed", handleChatClose);
    
    return () => {
      window.removeEventListener("chatWidgetOpened", handleChatOpen);
      window.removeEventListener("chatWidgetClosed", handleChatClose);
    };
  }, []);

  const handleLetsTalk = () => {
    // Trigger chat widget to open with voice mode
    const chatButton = document.getElementById("chat")?.querySelector("button");
    if (chatButton && !chatOpen) {
      chatButton.click();
    }
    
    // Dispatch custom event to trigger voice mode
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("startVoiceMode"));
    }, 100);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-12 shadow-sm md:px-10 md:py-16">
      <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-emerald-100 blur-3xl" aria-hidden />
      <div className="absolute right-10 bottom-10 h-16 w-16 rounded-full bg-sky-100 blur-3xl" aria-hidden />
      <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Intervieway
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
            Turn your website into a friendly assistant that captures leads automatically.
          </h1>
          <p className="text-lg text-slate-600">
            We set up your website, add an AI chatbot using <span className="font-semibold">your</span> own OpenAI or
            Gemini key, and send every lead straight to your inbox. One-time setup, simple handover, no jargon.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#chat"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              Chat with AI Assistant
            </a>
            <button
              onClick={handleLetsTalk}
              className="flex items-center gap-2 rounded-xl border-2 border-blue-300 bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-md shadow-blue-500/20 transition hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 active:scale-95 touch-manipulation"
            >
              <Mic className="h-4 w-4" />
              🎙️ Let&apos;s Talk (30 seconds)
            </button>
            <a
              href="#how-it-works"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-200 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              See How It Works
            </a>
          </div>
          <p className="text-xs text-slate-500">
            Prefer speaking instead of typing?
          </p>
        </div>
        <div className="flex max-w-sm flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-inner">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              🤝
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">Built for SMBs</p>
              <p className="text-xs text-slate-600">Friendly, clear, no tech jargon</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              We set up everything and hand it over.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              You keep the website, hosting, API keys, and data.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              Leads arrive in your email automatically.
            </li>
          </ul>
          <p className="text-xs text-slate-500">
            No subscriptions. One-time setup. Clear training so you can run it yourself.
          </p>
        </div>
      </div>
    </section>
  );
}
