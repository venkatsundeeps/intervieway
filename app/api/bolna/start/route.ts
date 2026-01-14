import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.BOLNA_API_KEY;
    const agentId = process.env.BOLNA_AGENT_ID;

    if (!apiKey) {
      console.error("BOLNA_API_KEY is not configured in environment variables");
      return NextResponse.json(
        { error: "Voice assistant is not configured. Please contact support." },
        { status: 500 }
      );
    }

    if (!agentId) {
      console.error("BOLNA_AGENT_ID is not configured in environment variables");
      return NextResponse.json(
        { error: "Voice agent is not configured. Please contact support." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { userName } = body;

    const bolnaPayload = {
      agent_id: agentId,
      user_data: {
        user_name: userName || "Guest",
        timestamp: new Date().toISOString(),
      },
    };

    const bolnaResponse = await fetch("https://api.bolna.dev/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(bolnaPayload),
    });

    if (!bolnaResponse.ok) {
      const errorText = await bolnaResponse.text();
      console.error("Bolna API error:", errorText);
      return NextResponse.json(
        { error: "Failed to start voice session. Please try again." },
        { status: bolnaResponse.status }
      );
    }

    const data = await bolnaResponse.json();

    return NextResponse.json({
      success: true,
      sessionUrl: data.call_url || data.session_url,
      sessionId: data.call_id || data.session_id,
      message: "Voice session created successfully",
    });
  } catch (error) {
    console.error("Error starting Bolna voice session:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
