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
      console.error(
        "VAPI_ASSISTANT_ID is not configured in environment variables"
      );
      return NextResponse.json(
        { error: "Voice assistant is not configured. Please contact support." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { phoneNumber } = body;

    // VAPI web call payload
    // Web calls return a clientUrl for browser-based voice interaction
    const vapiPayload: {
      assistantId: string;
      customer?: {
        number?: string;
        [key: string]: any;
      };
      [key: string]: any;
    } = {
      assistantId: assistantId,
    };

    // Add customer number if provided (can be used for identification/context)
    if (phoneNumber) {
      vapiPayload.customer = {
        number: phoneNumber,
      };
    }

    // Use VAPI web call endpoint
    const vapiResponse = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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

    // VAPI web call returns clientUrl for browser-based voice interaction
    // This URL opens a web interface for the voice call
    const sessionUrl = data.clientUrl || data.client?.url || data.url;

    if (!sessionUrl) {
      console.error("VAPI response missing clientUrl:", data);
      return NextResponse.json(
        { error: "Voice session created but no client URL received." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      callId: data.id,
      sessionUrl: sessionUrl,
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
