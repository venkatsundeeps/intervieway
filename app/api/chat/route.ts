import { NextResponse } from "next/server";
import { chatWithAI, ChatMessage } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = (body?.messages || []) as ChatMessage[];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const reply = await chatWithAI(messages);
    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

