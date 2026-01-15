"use client";

import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
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
    const chatButton = document.getElementById("chat")?.querySelector("button");
    if (chatButton && !chatOpen) {
      chatButton.click();
    }

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("startVoiceMode"));
    }, 100);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-12 shadow-sm md:px-10 md:py-16">
      <div
        className="absolute left-10 top-10 h-20 w-20 rounded-full bg-emerald-100 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute right-10 bottom-10 h-16 w-16 rounded-full bg-sky-100 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-8">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Get More Enquiries From Your Website — Automatically
          </h1>
          <p className="text-base text-slate-700 md:text-lg lg:text-xl">
            We set up a simple chat & voice assistant on your website that talks
            to visitors and turns them into real leads — even when you&apos;re
            busy.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="#chat"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              👉 Get More Leads (30-Second Demo)
            </a>
            <p className="text-sm text-slate-600">
              No tech skills needed • One-time setup • You own everything
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
