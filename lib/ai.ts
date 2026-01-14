import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { SYSTEM_PROMPT } from "./prompt";

export type ChatProvider = "openai" | "gemini";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function getProvider(): ChatProvider {
  const envProvider = process.env.AI_PROVIDER as ChatProvider | undefined;
  if (envProvider) return envProvider;
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.GEMINI_API_KEY) return "gemini";
  throw new Error(
    "No AI provider configured. Set AI_PROVIDER, OPENAI_API_KEY, or GEMINI_API_KEY."
  );
}

function buildMessages(messages: ChatMessage[]): ChatMessage[] {
  const hasSystem = messages.some((m) => m.role === "system");
  if (hasSystem) return messages;
  return [{ role: "system", content: SYSTEM_PROMPT }, ...messages];
}

async function callOpenAI(messages: ChatMessage[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is missing.");

  const client = new OpenAI({ apiKey });
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const completion = await client.chat.completions.create({
    model,
    messages: buildMessages(messages) as ChatCompletionMessageParam[],
    temperature: 0.4,
  });

  return (
    completion.choices[0]?.message?.content?.trim() ||
    "I couldn’t get a response right now."
  );
}

async function callGemini(messages: ChatMessage[]) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing.");

  const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const client = new GoogleGenAI({ apiKey });
  const history = buildMessages(messages);

  const prompt = history
    .map(
      (m) =>
        `${
          m.role === "assistant"
            ? "Assistant"
            : m.role === "user"
            ? "User"
            : "System"
        }: ${m.content}`
    )
    .join("\n");

  const result = await client.models.generateContent({
    model: modelName,
    contents: prompt,
  });

  // Library responses can vary by version
  let text: string | undefined;
  if (typeof result?.text === "string") {
    text = result.text;
  } else if (
    (result as any)?.response?.candidates?.[0]?.content?.parts &&
    Array.isArray((result as any).response.candidates[0].content.parts)
  ) {
    text = (result as any).response.candidates[0].content.parts
      .map((part: { text?: string }) => part.text || "")
      .join("\n");
  }

  if (!text) {
    text = "I couldn’t get a response right now.";
  }

  return text.trim();
}

export async function chatWithAI(messages: ChatMessage[]) {
  const provider = getProvider();
  if (provider === "openai") {
    return callOpenAI(messages);
  } else {
    return callGemini(messages);
  }
}
