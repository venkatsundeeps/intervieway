"use client";

import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

export default function VoiceOption() {
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
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Prefer talking instead of typing?
        </h2>
        <div className="space-y-4 text-lg text-slate-700">
          <p>
            Visitors can talk instead of typing
          </p>
          <p>
            Takes about 30 seconds
          </p>
          <p>
            Completely optional
          </p>
        </div>
        <div className="pt-2 space-y-3">
          <button
            onClick={handleLetsTalk}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-blue-300 bg-white px-6 py-3 text-base font-bold text-blue-700 shadow-md shadow-blue-500/20 transition hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 active:scale-95 touch-manipulation"
          >
            <Mic className="h-5 w-5" />
            🎙️ Talk for 30 Seconds (Optional)
          </button>
          <p className="text-sm text-slate-600">
            No pressure • No recordings saved • Just answers
          </p>
        </div>
      </div>
    </section>
  );
}
