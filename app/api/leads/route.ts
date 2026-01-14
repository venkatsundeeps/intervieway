import { NextResponse } from "next/server";

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  businessType?: string;
  mainProblem?: string;
  aiSummary: string;
  auditAnswers?: string[];
  auditSummary?: string;
  auditScore?: string;
  source?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const { name, email, phone, businessType, mainProblem, aiSummary, auditAnswers, auditSummary, auditScore } = body;

    if (!name || !email) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const payload = {
      timestamp,
      name,
      email,
      phone: phone || "",
      businessType: businessType || "",
      mainProblem: mainProblem || "",
      aiSummary,
      auditAnswers: auditAnswers || [],
      auditSummary: auditSummary || aiSummary,
      auditScore: auditScore || "",
      source: body.source || "Intervieway Website Chatbot",
    };

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Fallback: log only on server, never show to user
      // eslint-disable-next-line no-console
      console.log("Lead captured (no LEAD_WEBHOOK_URL set):", payload);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving lead:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}


