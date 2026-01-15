import { NextRequest, NextResponse } from "next/server";

// Webhook endpoint for VAPI to send call updates and transcriptions
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Handle VAPI webhook events
    // This can be used to process call transcripts, status updates, etc.
    console.log("VAPI webhook received:", body);

    // You can process the webhook data here
    // For example, extract conversation data, save transcripts, etc.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing VAPI webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
