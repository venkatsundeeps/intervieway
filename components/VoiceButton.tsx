"use client";

import { Mic, PhoneCall, Volume2 } from "lucide-react";
import { useState } from "react";

export default function VoiceButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleStartVoiceCall = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bolna/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: "Website Visitor",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to start voice session");
      }

      if (data.sessionUrl) {
        window.open(data.sessionUrl, "_blank", "noopener,noreferrer");
        setShowModal(false);
      } else {
        throw new Error("No session URL received");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      console.error("Voice call error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3.5 text-base font-bold text-white shadow-2xl shadow-blue-500/40 transition-all hover:from-blue-500 hover:to-blue-600 hover:shadow-blue-500/60 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 md:bottom-28 md:right-6"
        aria-label="Start voice call"
      >
        <PhoneCall className="h-5 w-5" />
        <span>Let&apos;s Talk</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-center">
              <div className="rounded-full bg-blue-100 p-4">
                <Volume2 className="h-12 w-12 text-blue-600" />
              </div>
            </div>

            <h2 className="mb-3 text-center text-2xl font-bold text-slate-900">
              Start Voice Call
            </h2>

            <p className="mb-6 text-center text-base text-slate-600 leading-relaxed">
              Talk to our AI assistant using your voice. Your browser will ask for microphone permission.
            </p>

            <div className="mb-6 rounded-xl bg-blue-50 border-2 border-blue-200 p-4">
              <div className="flex items-start gap-3">
                <Mic className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Microphone access is required</strong> to talk with the assistant. 
                  Click &quot;Allow&quot; when prompted by your browser.
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-rose-50 border-2 border-rose-200 px-4 py-3">
                <p className="text-sm font-semibold text-rose-700 text-center">{error}</p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={handleStartVoiceCall}
                disabled={isLoading}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Starting Call...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <PhoneCall className="h-5 w-5" />
                    Start Voice Call
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
                disabled={isLoading}
                className="w-full rounded-xl border-2 border-slate-300 bg-white px-6 py-4 text-base font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-slate-500">
              Voice calls are powered by Bolna AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
