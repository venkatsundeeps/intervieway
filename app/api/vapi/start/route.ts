import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.VAPI_API_KEY;
    const assistantId = process.env.VAPI_ASSISTANT_ID;

    if (!apiKey) {
      console.error("VAPI_API_KEY is not configured in environment variables");
      return NextResponse.json(
        { error: "Voice assistant is not configured. Please contact support." },
        { status: 500 }
      );
    }

    if (!assistantId) {
      console.error("VAPI_ASSISTANT_ID is not configured in environment variables");
      return NextResponse.json(
        { error: "Voice assistant is not configured. Please contact support." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { phoneNumber } = body;

    // VAPI call creation payload
    const vapiPayload = {
      assistantId: assistantId,
      phoneNumberId: phoneNumber ? undefined : undefined, // For web-based calls, phoneNumberId is optional
      customer: {
        number: phoneNumber || undefined, // Optional for web calls
      },
      // Web-based call configuration
      ...(phoneNumber ? {} : {
        webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/vapi/webhook`,
      }),
    };

    const vapiResponse = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(vapiPayload),
    });

    if (!vapiResponse.ok) {
      const errorText = await vapiResponse.text();
      console.error("VAPI API error:", errorText);
      return NextResponse.json(
        { error: "Failed to start voice session. Please try again." },
        { status: vapiResponse.status }
      );
    }

    const data = await vapiResponse.json();

    return NextResponse.json({
      success: true,
      callId: data.id,
      sessionUrl: data.clientUrl || data.webhookUrl,
      message: "Voice session created successfully",
    });
  } catch (error) {
    console.error("Error starting VAPI voice session:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
