"use client";

import { MessageCircle, Mic, RefreshCw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Phase = "choice" | "chat" | "voice" | "capture" | "submitting" | "done";

type BusinessInfo = {
  businessType?: string;
  contactMethod?: string;
  mainChallenge?: string;
  website?: string;
  summary?: string;
};

const QUICK_REPLIES = ["Clinic", "Coaching", "Real Estate", "Local Service"];

function uid() {
  return Math.random().toString(36).slice(2);
}

interface ChatWidgetProps {
  initialMode?: "type" | "voice";
}

export default function ChatWidget({ initialMode }: ChatWidgetProps = {}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<Phase>("choice");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({});
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [voiceCallActive, setVoiceCallActive] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleStartVoice() {
    setPhase("voice");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/vapi/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        throw new Error("Could not start voice session.");
      }

      const data = await res.json();

      if (data.sessionUrl) {
        // Open VAPI session in new window/tab
        window.open(data.sessionUrl, "_blank", "noopener,noreferrer");
        setVoiceCallActive(true);

        // Show message about voice call
        const voiceMessage: ChatMessage = {
          id: uid(),
          role: "assistant",
          content:
            "Voice call started! 🎙️\n\nI'll ask you 3-4 quick questions (under 1 minute). After that, I'll ask for your name and contact details.\n\nSpeak naturally—I'm listening!",
        };
        setMessages([voiceMessage]);
      } else {
        throw new Error("No session URL received");
      }
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.";
      setError(message);
      setPhase("choice");
    } finally {
      setLoading(false);
    }
  }

  // Listen for voice mode trigger from Hero button
  useEffect(() => {
    const handleVoiceMode = () => {
      if (open) {
        // If chat is open and in choice phase, start voice
        if (phase === "choice") {
          handleStartVoice();
        } else if (phase === "chat") {
          // If already in chat, switch to voice
          handleStartVoice();
        }
      }
    };

    window.addEventListener("startVoiceMode", handleVoiceMode);
    return () => {
      window.removeEventListener("startVoiceMode", handleVoiceMode);
    };
  }, [open, phase]);

  // Initialize when chat opens
  useEffect(() => {
    if (open && messages.length === 0) {
      if (initialMode === "voice") {
        // Auto-start voice mode
        handleStartVoice();
      } else {
        // Show choice screen
        setPhase("choice");
        setMessages([]);
      }
    }
  }, [open, messages.length, initialMode]);

  // Dispatch events when chat opens/closes
  useEffect(() => {
    if (open) {
      window.dispatchEvent(new CustomEvent("chatWidgetOpened"));
    } else {
      window.dispatchEvent(new CustomEvent("chatWidgetClosed"));
    }
  }, [open]);

  // Check if we should show quick replies (when asking about business type)
  useEffect(() => {
    if (phase !== "chat" || messages.length === 0) {
      setShowQuickReplies(false);
      return;
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant") {
      const content = lastMessage.content.toLowerCase();
      const userMessageCount = messages.filter((m) => m.role === "user").length;

      const isAskingBusinessType =
        (content.includes("type of business") ||
          content.includes("what kind of business") ||
          content.includes("what business") ||
          content.includes("business do you") ||
          content.includes("business you run")) &&
        userMessageCount === 0;

      setShowQuickReplies(isAskingBusinessType);
    } else {
      setShowQuickReplies(false);
    }
  }, [messages, phase]);

  function resetChat() {
    setMessages([]);
    setInput("");
    setError("");
    setPhase("choice");
    setLeadName("");
    setLeadEmail("");
    setLeadPhone("");
    setBusinessInfo({});
    setShowQuickReplies(false);
    setVoiceCallActive(false);
    setLoading(false);
  }

  function handleTypeChoice() {
    setPhase("chat");
    const welcome: ChatMessage = {
      id: uid(),
      role: "assistant",
      content:
        "Hi! I'll ask a few easy questions to understand your business and see how Intervieway can help.",
    };
    setMessages([welcome]);
  }

  // Extract business information from conversation
  function extractBusinessInfo(messages: ChatMessage[]): BusinessInfo {
    const info: BusinessInfo = {};
    const userMessages = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content.trim())
      .filter((m) => m.length > 0);

    if (userMessages.length > 0) {
      const firstAnswer = userMessages[0];
      if (
        firstAnswer.length > 5 &&
        !firstAnswer.toLowerCase().match(/^(yes|no|ok|sure|alright)$/i)
      ) {
        info.businessType = firstAnswer;
      }
    }

    if (userMessages.length > 1) {
      const secondAnswer = userMessages[1];
      if (
        secondAnswer.length > 3 &&
        !secondAnswer.toLowerCase().match(/^(yes|no|ok|sure|alright)$/i)
      ) {
        info.contactMethod = secondAnswer;
      }
    }

    if (userMessages.length > 2) {
      const thirdAnswer = userMessages[2];
      if (
        thirdAnswer.length > 3 &&
        !thirdAnswer.toLowerCase().match(/^(yes|no|ok|sure|alright)$/i)
      ) {
        info.mainChallenge = thirdAnswer;
      }
    }

    if (userMessages.length > 3) {
      const fourthAnswer = userMessages[3];
      if (
        fourthAnswer.includes("http") ||
        fourthAnswer.toLowerCase().includes("yes") ||
        fourthAnswer.toLowerCase().includes("no") ||
        fourthAnswer.toLowerCase().includes("don't") ||
        fourthAnswer.toLowerCase().includes("do not")
      ) {
        info.website = fourthAnswer;
      }
    }

    const assistantMessages = messages.filter((m) => m.role === "assistant");
    for (let i = assistantMessages.length - 1; i >= 0; i--) {
      const msg = assistantMessages[i];
      if (msg.content.includes("•") || msg.content.includes("summary")) {
        info.summary = msg.content;
        break;
      }
    }

    return info;
  }

  // Check if conversation is ready for lead capture
  function shouldShowLeadCapture(messages: ChatMessage[]): boolean {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== "assistant") return false;

    const content = lastMessage.content.toLowerCase();
    const userMessageCount = messages.filter((m) => m.role === "user").length;

    const hasSummarySignal =
      content.includes("contact details") ||
      content.includes("share this with") ||
      content.includes("get your") ||
      content.includes("can i get") ||
      (content.includes("summary") && content.includes("•"));

    const hasEnoughAnswers = userMessageCount >= 4;

    return hasSummarySignal && hasEnoughAnswers;
  }

  useEffect(() => {
    if (open && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open, showQuickReplies]);

  // Focus input when chat opens on mobile
  useEffect(() => {
    if (open && phase === "chat" && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open, phase]);

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
    setShowQuickReplies(false);

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
        "Got it — that helps. Let me ask you another question.";

      const assistantMessage: ChatMessage = {
        id: uid(),
        role: "assistant",
        content: reply,
      };

      const updatedMessages = [...nextMessages, assistantMessage];
      setMessages(updatedMessages);

      const extractedInfo = extractBusinessInfo(updatedMessages);
      setBusinessInfo(extractedInfo);

      if (shouldShowLeadCapture(updatedMessages)) {
        if (!extractedInfo.summary) {
          const summary = generateSummary(extractedInfo);
          setBusinessInfo({ ...extractedInfo, summary });
        }
        setPhase("capture");
      }
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

  function generateSummary(info: BusinessInfo): string {
    const parts: string[] = [];
    if (info.businessType) {
      const businessType = info.businessType.toLowerCase().includes("business")
        ? info.businessType
        : `${info.businessType} business`;
      parts.push(`• You run a ${businessType}.`);
    }
    if (info.contactMethod) {
      parts.push(`• Customers reach you via ${info.contactMethod}.`);
    }
    if (info.mainChallenge) {
      parts.push(`• Your main challenge is ${info.mainChallenge}.`);
    }
    if (info.website) {
      if (
        info.website.toLowerCase().includes("yes") ||
        info.website.includes("http")
      ) {
        parts.push(
          `• You have a website${
            info.website.includes("http") ? ` (${info.website})` : ""
          }.`
        );
      } else {
        parts.push(`• You don't have a website yet.`);
      }
    }
    return parts.join("\n");
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !leadName.trim() ||
      !leadEmail.trim() ||
      phase === "submitting" ||
      phase === "done"
    )
      return;

    setPhase("submitting");
    setError("");

    const finalSummary = businessInfo.summary || generateSummary(businessInfo);

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
          businessType: businessInfo.businessType || "",
          contactMethod: businessInfo.contactMethod || "",
          mainChallenge: businessInfo.mainChallenge || "",
          website: businessInfo.website || "",
          aiSummary: finalSummary,
          source: voiceCallActive
            ? "Intervieway Website Chatbot - Voice"
            : "Intervieway Website Chatbot",
        }),
      });

      if (!leadRes.ok) {
        throw new Error("Lead save failed");
      }

      const successMessage: ChatMessage = {
        id: uid(),
        role: "assistant",
        content:
          "All set 👍 We've shared this with the team.\n\nYour details are only shared with the Intervieway team. No spam.",
      };

      setMessages((prev) => [...prev, successMessage]);
      setPhase("done");
    } catch {
      const failMessage: ChatMessage = {
        id: uid(),
        role: "assistant",
        content: "Something didn't go through — let's try once more.",
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
          className="rounded-full bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 active:scale-95 touch-manipulation"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? "Close" : "Chat"}
        </button>

        {open && (
          <div className="flex h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-[420px] flex-col rounded-2xl border-2 border-slate-200 bg-white shadow-2xl sm:h-[600px] sm:w-[420px]">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b-2 border-slate-100 bg-gradient-to-r from-emerald-50 to-white px-4 py-3 sm:px-5 sm:py-4">
              <div>
                <p className="text-base font-bold text-slate-900 sm:text-lg">
                  Intervieway Assistant
                </p>
                <p className="text-xs text-slate-600 sm:text-sm">
                  {voiceCallActive ? "Voice call active" : "Online now"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/916303011316"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-200 bg-white text-emerald-700 transition hover:bg-emerald-50 active:scale-95 touch-manipulation sm:h-9 sm:w-9"
                  aria-label="Chat on WhatsApp"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle
                    className="h-5 w-5 sm:h-4 sm:w-4"
                    aria-hidden
                  />
                </a>
                <button
                  type="button"
                  onClick={resetChat}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 active:scale-95 touch-manipulation sm:h-9 sm:w-9"
                  aria-label="Restart chat"
                  title="Restart chat"
                  disabled={loading}
                >
                  <RefreshCw className="h-5 w-5 sm:h-4 sm:w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 active:scale-95 touch-manipulation sm:h-9 sm:w-9"
                  aria-label="Close chat"
                  title="Close chat"
                >
                  <X className="h-5 w-5 sm:h-5 sm:w-5" aria-hidden />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={chatRef}
              className="flex flex-1 flex-col gap-5 overflow-y-auto bg-gradient-to-b from-slate-50 to-white px-4 py-5 sm:px-5 sm:gap-4"
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
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm sm:text-base ${
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
                    {phase === "voice" ? "Starting voice call…" : "Typing…"}
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="shrink-0 border-t-2 border-slate-100 bg-slate-50 px-4 py-4 sm:px-5 sm:py-4">
              {/* Choice Screen */}
              {phase === "choice" && (
                <div className="space-y-4">
                  <p className="text-center text-base font-semibold text-slate-900">
                    How would you like to share your requirement?
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleTypeChoice}
                      className="flex items-center justify-center gap-3 rounded-xl border-2 border-emerald-300 bg-white px-5 py-4 text-base font-semibold text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-50 active:scale-95 touch-manipulation"
                      disabled={loading}
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>💬 Type (Quick chat)</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleStartVoice}
                      className="flex items-center justify-center gap-3 rounded-xl border-2 border-blue-300 bg-white px-5 py-4 text-base font-semibold text-blue-700 transition hover:border-blue-400 hover:bg-blue-50 active:scale-95 touch-manipulation"
                      disabled={loading}
                    >
                      <Mic className="h-5 w-5" />
                      <span>🎙️ Talk (Fastest – under 1 minute)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Chat Phase */}
              {phase === "chat" && (
                <div className="space-y-3">
                  {showQuickReplies && (
                    <div className="flex flex-wrap gap-2">
                      {QUICK_REPLIES.map((reply) => (
                        <button
                          key={reply}
                          type="button"
                          onClick={() => {
                            setShowQuickReplies(false);
                            void sendMessage(reply);
                          }}
                          className="rounded-full border-2 border-emerald-300 bg-white px-4 py-2.5 text-sm font-medium text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-50 active:scale-95 touch-manipulation disabled:opacity-50"
                          disabled={chatDisabled}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}

                  <form
                    className="flex items-end gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (chatDisabled) return;
                      void sendMessage(input);
                    }}
                  >
                    <input
                      ref={inputRef}
                      className="flex-1 min-w-0 rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 touch-manipulation"
                      placeholder="Type your message…"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={chatDisabled}
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-xl bg-emerald-600 px-5 py-3.5 text-base font-bold text-white shadow-md shadow-emerald-500/30 transition hover:bg-emerald-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation"
                      disabled={chatDisabled || !input.trim()}
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}

              {/* Voice Phase */}
              {phase === "voice" && !voiceCallActive && (
                <div className="space-y-3 text-center">
                  <p className="text-sm text-slate-600">
                    Preparing voice call…
                  </p>
                </div>
              )}

              {phase === "voice" && voiceCallActive && (
                <div className="space-y-3 text-center">
                  <p className="text-sm font-semibold text-slate-900">
                    Voice call is active in another window
                  </p>
                  <p className="text-xs text-slate-600">
                    After the call, you can share your contact details here.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPhase("capture")}
                    className="w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-base font-bold text-white shadow-md shadow-emerald-500/30 transition hover:bg-emerald-500 active:scale-95 touch-manipulation"
                  >
                    I&apos;m done with the call
                  </button>
                </div>
              )}

              {/* Lead Capture Form */}
              {(phase === "capture" ||
                phase === "submitting" ||
                phase === "done") && (
                <form
                  className="space-y-4 text-sm text-slate-800"
                  onSubmit={handleLeadSubmit}
                >
                  <p className="text-sm text-slate-700 bg-emerald-50 border-2 border-emerald-200 rounded-xl px-4 py-3 leading-relaxed">
                    I&apos;ll share this with the Intervieway team so we can
                    help you better.
                  </p>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 touch-manipulation"
                      placeholder="Your name"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      required
                      disabled={phase === "submitting" || phase === "done"}
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      Email <span className="text-rose-600">*</span>
                    </label>
                    <input
                      className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 touch-manipulation"
                      type="email"
                      placeholder="your@email.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      required
                      disabled={phase === "submitting" || phase === "done"}
                      autoComplete="email"
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
                      className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 touch-manipulation"
                      type="tel"
                      placeholder="Your phone number"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      disabled={phase === "submitting" || phase === "done"}
                      autoComplete="tel"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 px-4 py-4 text-base font-bold text-white shadow-md shadow-emerald-500/30 transition hover:bg-emerald-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation"
                    disabled={
                      phase === "submitting" ||
                      phase === "done" ||
                      !leadName.trim() ||
                      !leadEmail.trim()
                    }
                  >
                    {phase === "submitting"
                      ? "Sending..."
                      : "Send to Intervieway team"}
                  </button>
                  <p className="text-xs text-slate-500 text-center leading-relaxed">
                    Your details are only shared with the Intervieway team. No
                    spam.
                  </p>
                </form>
              )}

              {error && (
                <div className="mt-3 rounded-xl bg-rose-50 border-2 border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700">
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
