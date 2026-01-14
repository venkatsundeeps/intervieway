"use client";

import { MessageCircle, RefreshCw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Phase = "chat" | "capture" | "submitting" | "done";

const AUDIT_QUESTIONS = [
  "What type of business do you run?",
  "How do customers usually contact you today?",
  "Do you get enquiries from your website? Tell me a bit about it.",
  "What's the biggest challenge with follow-ups right now?",
];

const STARTERS = [
  "Quick one 🙂 — I want more enquiries without chasing everyone.",
  "I get leads but follow-up is messy. Can this help?",
  "Can you set this up for my coaching / consulting business?",
];

const GREETING =
  "Hi! I'm the Intervieway assistant. I'll ask a few quick questions and then pass everything to the team for you.\n\nWant a quick 2-minute business audit? It's very easy 🙂";

function uid() {
  return Math.random().toString(36).slice(2);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: uid(), role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoOpened, setAutoOpened] = useState(false);
  const [phase, setPhase] = useState<Phase>("chat");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [auditStep, setAuditStep] = useState<number | null>(null);
  const [auditAnswers, setAuditAnswers] = useState<string[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  function resetChat() {
    setMessages([{ id: uid(), role: "assistant", content: GREETING }]);
    setInput("");
    setError("");
    setPhase("chat");
    setLeadName("");
    setLeadEmail("");
    setLeadPhone("");
    setAuditStep(null);
    setAuditAnswers([]);
    setLoading(false);
  }

  function startAudit() {
    if (auditStep !== null || phase !== "chat") return;
    const intro: ChatMessage = {
      id: uid(),
      role: "assistant",
      content:
        "Great, let's do a quick 2-minute business check.\n\nQuestion 1 of 4:\nWhat type of business do you run?",
    };
    setMessages((prev) => [...prev, intro]);
    setAuditStep(0);
    setAuditAnswers([]);
  }

  // Disabled auto-open - chat opens only when user clicks
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setOpen(true);
  //     setAutoOpened(true);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (open && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendMessage(text: string) {
    if (!text || loading || phase !== "chat") return;
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: uid(),
      role: "user",
      content: trimmed,
    };
    const nextMessages: ChatMessage[] = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError("");

    if (auditStep !== null) {
      const nextAnswers = [...auditAnswers];
      nextAnswers[auditStep] = trimmed;
      setAuditAnswers(nextAnswers);

      const total = AUDIT_QUESTIONS.length;
      const nextStep = auditStep + 1;

      if (nextStep < total) {
        const progress = `${nextStep} of ${total} done 👍`;
        const bot: ChatMessage = {
          id: uid(),
          role: "assistant",
          content: `${progress}\n\nQuestion ${nextStep + 1} of ${total}:\n${
            AUDIT_QUESTIONS[nextStep]
          }`,
        };
        setMessages((prev) => [...prev, bot]);
        setAuditStep(nextStep);
      } else {
        const [business, contact, website, followups] = nextAnswers;

        const websiteText = (website || "").toLowerCase();
        const followText = (followups || "").toLowerCase();
        let auditScore: "Good" | "Average" | "Needs Improvement" = "Average";
        if (
          websiteText.includes("yes") &&
          !followText.includes("hard") &&
          !followText.includes("slow")
        ) {
          auditScore = "Good";
        } else if (
          websiteText.includes("no") ||
          websiteText.includes("not") ||
          followText.includes("late") ||
          followText.includes("forget")
        ) {
          auditScore = "Needs Improvement";
        }

        const summaryLines = [
          `• You run a ${business || "growing"} business.`,
          `• Customers mostly reach you via ${
            contact || "your current channels"
          }.`,
          website
            ? `• Website enquiries are ${
                website.toLowerCase().includes("yes")
                  ? "there but could grow"
                  : "limited today"
              }.`
            : "• Website enquiries are not a strong source yet.",
          `• Follow-ups feel ${followups || "like they could be smoother"}.`,
          "• One clear opportunity: a simple chat assistant on your website can catch missed visitors and send you more enquiries.",
          `• Audit score: **${auditScore}**.`,
          "",
          "Want me to email this audit summary to you?",
        ];

        const summaryMessage: ChatMessage = {
          id: uid(),
          role: "assistant",
          content: `Your quick audit result:\n${summaryLines.join("\n")}`,
        };

        setMessages((prev) => [...prev, summaryMessage]);
        setAuditStep(null);
        setPhase("capture");
      }

      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("Could not reach the chatbot right now.");
      }

      const data = (await res.json()) as { reply?: string };
      const reply =
        data.reply?.trim() ||
        "Got it — that helps. Quick one 🙂: tell me a bit more, in your own words.";

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", content: reply },
      ]);
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.";
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content: "Something didn't go through. Can we try that once more?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !leadName.trim() ||
      !leadEmail.trim() ||
      phase === "submitting" ||
      messages.length === 0
    )
      return;

    setPhase("submitting");
    setError("");

    const answers = auditAnswers;
    const businessType = answers[0] ?? "";
    const mainProblem = answers[3] ?? "";

    const websiteText = (answers[2] || "").toLowerCase();
    const followText = (answers[3] || "").toLowerCase();
    let auditScore: "Good" | "Average" | "Needs Improvement" = "Average";
    if (
      websiteText.includes("yes") &&
      !followText.includes("hard") &&
      !followText.includes("slow")
    ) {
      auditScore = "Good";
    } else if (
      websiteText.includes("no") ||
      websiteText.includes("not") ||
      followText.includes("late") ||
      followText.includes("forget")
    ) {
      auditScore = "Needs Improvement";
    }

    const auditSummary =
      `Business: ${businessType || "growing business"}.\n` +
      `Contact: ${answers[1] || "current channels"}.\n` +
      `Website enquiries: ${answers[2] || "not a strong source yet"}.\n` +
      `Follow-ups: ${answers[3] || "could be smoother"}.\n` +
      `Audit score: ${auditScore}.`;

    const savingMessage: ChatMessage = {
      id: uid(),
      role: "assistant",
      content: "Saving this… one second ⏳",
    };
    setMessages((prev) => [...prev, savingMessage]);

    try {
      const leadRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName.trim(),
          email: leadEmail.trim(),
          phone: leadPhone.trim() || undefined,
          businessType,
          mainProblem,
          aiSummary: auditSummary,
          auditAnswers: answers,
          auditSummary,
          auditScore,
          source: "Intervieway Website Chatbot",
        }),
      });

      if (!leadRes.ok) {
        throw new Error("Lead save failed");
      }

      const successMessage: ChatMessage = {
        id: uid(),
        role: "assistant",
        content:
          "All set! I've shared this with the team 👍\n\nYour details are shared only with the business owner.",
      };

      setMessages((prev) => [...prev, successMessage]);
      setPhase("done");
    } catch {
      const failMessage: ChatMessage = {
        id: uid(),
        role: "assistant",
        content: "Something didn't go through. Can we try once more?",
      };
      setMessages((prev) => [...prev, failMessage]);
      setPhase("capture");
    }
  }

  const chatDisabled = loading || phase !== "chat";

  return (
    <>
      <div
        id="chat"
        className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6"
      >
        <button
          className="rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Close Assistant" : "Chat with AI Assistant"}
        </button>

        {open && (
          <div className="flex h-[600px] w-[380px] max-w-[90vw] flex-col rounded-2xl border-2 border-slate-200 bg-white shadow-2xl sm:w-[420px]">
            <div className="flex shrink-0 items-center justify-between border-b-2 border-slate-100 bg-gradient-to-r from-emerald-50 to-white px-5 py-4">
              <div>
                <p className="text-base font-bold text-slate-900">
                  Intervieway Assistant
                </p>
                <p className="text-sm text-slate-600">
                  {autoOpened ? "Auto-opened to say hello" : "Online now"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/916303011316"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-200 bg-white text-emerald-700 transition hover:bg-emerald-50"
                  aria-label="Chat on WhatsApp"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                </a>
                <button
                  type="button"
                  onClick={resetChat}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-200 text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  aria-label="Restart chat"
                  title="Restart chat"
                  disabled={loading}
                >
                  <RefreshCw className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-200 text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                  aria-label="Close chat"
                  title="Close chat"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>

            <div
              ref={chatRef}
              className="flex flex-1 flex-col gap-4 overflow-y-auto bg-gradient-to-b from-slate-50 to-white px-5 py-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-base leading-relaxed shadow-sm ${
                      message.role === "user"
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-slate-900 border-2 border-slate-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl border-2 border-emerald-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    Typing…
                  </div>
                </div>
              )}
            </div>

            <div className="shrink-0 border-t-2 border-slate-100 bg-slate-50 px-5 py-4 space-y-3">
              {phase === "chat" && (
                <>
                  <div className="flex flex-wrap gap-2">
                    {STARTERS.map((item) => (
                      <button
                        key={item}
                        className="rounded-full border-2 border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 disabled:opacity-50"
                        onClick={() => sendMessage(item)}
                        disabled={chatDisabled}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={startAudit}
                    className="w-full rounded-xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900 transition hover:bg-emerald-100 disabled:opacity-50"
                    disabled={auditStep !== null || loading}
                  >
                    Start free 2-minute business audit
                  </button>
                  <form
                    className="flex items-center gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (chatDisabled) return;
                      void sendMessage(input);
                    }}
                  >
                    <input
                      className="flex-1 min-w-0 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                      placeholder="Type your message…"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={chatDisabled}
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-xl bg-emerald-600 px-4 py-3 text-base font-bold text-white shadow-md shadow-emerald-500/30 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={chatDisabled || !input.trim()}
                    >
                      Send
                    </button>
                  </form>
                </>
              )}

              {(phase === "capture" ||
                phase === "submitting" ||
                phase === "done") && (
                <form
                  className="space-y-3 text-sm text-slate-800"
                  onSubmit={handleLeadSubmit}
                >
                  <p className="text-sm text-slate-700 bg-emerald-50 border-2 border-emerald-200 rounded-xl px-4 py-3 leading-relaxed">
                    Almost done — you&apos;re doing great 👍 I&apos;ll share
                    this with the business owner so they can help you.
                  </p>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                      placeholder="Your name"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      required
                      disabled={phase === "submitting" || phase === "done"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      Email <span className="text-rose-600">*</span>
                    </label>
                    <input
                      className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                      type="email"
                      placeholder="your@email.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      required
                      disabled={phase === "submitting" || phase === "done"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      Phone{" "}
                      <span className="text-slate-500 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                      placeholder="Your phone number"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      disabled={phase === "submitting" || phase === "done"}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-base font-bold text-white shadow-md shadow-emerald-500/30 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={
                      phase === "submitting" ||
                      phase === "done" ||
                      !leadName.trim() ||
                      !leadEmail.trim()
                    }
                  >
                    {phase === "submitting"
                      ? "Sending..."
                      : "Send to business owner"}
                  </button>
                  <p className="text-xs text-slate-500 text-center leading-relaxed">
                    Your details are shared only with the business owner.
                  </p>
                </form>
              )}

              {error && (
                <div className="rounded-xl bg-rose-50 border-2 border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
