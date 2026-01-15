import { NextResponse } from "next/server";
import { chatWithAI, ChatMessage } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = (body?.messages || []) as ChatMessage[];

    // Allow empty messages array for initial welcome message
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format." },
        { status: 400 }
      );
    }

    const reply = await chatWithAI(messages);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error";

    // Provide more helpful error messages
    let statusCode = 500;
    let errorMessage = message;

    if (message.includes("API_KEY") || message.includes("provider")) {
      errorMessage = "Chat service is not configured. Please contact support.";
      statusCode = 503;
    } else if (message.includes("network") || message.includes("fetch")) {
      errorMessage =
        "Network error. Please check your connection and try again.";
      statusCode = 503;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
