import { NextResponse } from "next/server";

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  businessType?: string;
  contactMethod?: string;
  mainChallenge?: string;
  website?: string;
  aiSummary: string;
  source?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const {
      name,
      email,
      phone,
      businessType,
      contactMethod,
      mainChallenge,
      website,
      aiSummary,
      source,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    
    // Structure the lead data as required
    const payload = {
      timestamp,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      businessType: businessType?.trim() || "",
      currentContactMethod: contactMethod?.trim() || "",
      mainBusinessChallenge: mainChallenge?.trim() || "",
      website: website?.trim() || "",
      aiGeneratedSummary: aiSummary?.trim() || "",
      source: source || "Intervieway Website Chatbot",
    };

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!webhookRes.ok) {
        // Log error but don't expose to user
        // eslint-disable-next-line no-console
        console.error("Webhook failed:", await webhookRes.text());
        throw new Error("Failed to save lead");
      }
    } else {
      // Fallback: log only on server, never show to user
      // eslint-disable-next-line no-console
      console.log("Lead captured (no LEAD_WEBHOOK_URL set):", payload);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving lead:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
