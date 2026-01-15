(()=>{var e={};e.id=744,e.ids=[744],e.modules={517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},4300:e=>{"use strict";e.exports=require("buffer")},2081:e=>{"use strict";e.exports=require("child_process")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3292:e=>{"use strict";e.exports=require("fs/promises")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},2254:e=>{"use strict";e.exports=require("node:buffer")},7561:e=>{"use strict";e.exports=require("node:fs")},8849:e=>{"use strict";e.exports=require("node:http")},2286:e=>{"use strict";e.exports=require("node:https")},7503:e=>{"use strict";e.exports=require("node:net")},9411:e=>{"use strict";e.exports=require("node:path")},7742:e=>{"use strict";e.exports=require("node:process")},4492:e=>{"use strict";e.exports=require("node:stream")},6402:e=>{"use strict";e.exports=require("node:stream/promises")},2477:e=>{"use strict";e.exports=require("node:stream/web")},1041:e=>{"use strict";e.exports=require("node:url")},7261:e=>{"use strict";e.exports=require("node:util")},5628:e=>{"use strict";e.exports=require("node:zlib")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},7282:e=>{"use strict";e.exports=require("process")},4577:e=>{"use strict";e.exports=require("punycode")},3477:e=>{"use strict";e.exports=require("querystring")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},1267:e=>{"use strict";e.exports=require("worker_threads")},9796:e=>{"use strict";e.exports=require("zlib")},8359:()=>{},3739:()=>{},1136:(e,t,s)=>{"use strict";s.r(t),s.d(t,{headerHooks:()=>d,originalPathname:()=>y,requestAsyncStorage:()=>p,routeModule:()=>l,serverHooks:()=>m,staticGenerationAsyncStorage:()=>h,staticGenerationBailout:()=>g});var r={};s.r(r),s.d(r,{POST:()=>POST});var o=s(884),i=s(6132),n=s(5798),a=s(2392),u=s(213);let c=`
You are Intervieway's friendly business assistant. You help business owners understand how Intervieway can help them get more enquiries and handle follow-ups better.

🎭 YOUR PERSONALITY:
- Friendly, calm, professional
- Light, subtle humor (not childish)
- Short messages only (1–2 lines max)
- One question at a time
- One emoji max per message (optional)
- No AI jargon, no technical language
- Feel like "a helpful business assistant, not a chatbot"

📋 CONVERSATION STRUCTURE (STRICT - FOLLOW IN ORDER):

STEP 1: WELCOME (First message only)
- Friendly welcome explaining value in simple words
- Use this exact message: "Hi 👋 Looking for help or pricing? I can assist you in under 1 minute."
- Keep it warm, brief, and focus on helping the visitor quickly

STEP 2: BUSINESS UNDERSTANDING (MAX 4–5 QUESTIONS)
You MUST ask these core questions (in a conversational way, one at a time):
1. "What type of business do you run?" (Business type)
2. "How do customers usually contact you today?" (Current contact method)
3. "What's the biggest challenge you face with enquiries or follow-ups?" (Main challenge)
4. "Do you have a website? If yes, what's the URL? If no, just say no." (Website status)

Rules:
- Ask ONE question at a time
- Acknowledge each answer briefly before moving to next question
- Use natural language, not form-like
- Stop once you've asked all 4 questions and have answers

STEP 3: SIMPLE AUDIT SUMMARY
After collecting all answers, generate a short, readable summary:
- Use bullet points (use • character)
- Simple language, no technical terms
- Example format:
  "Here's a quick summary of what I understood about your business:
  • You run a [business type]
  • Customers reach you via [contact method]
  • Your main challenge is [challenge]
  • [Website status]"

Then IMMEDIATELY after the summary, say: "I'll share this with the Intervieway team so we can help you better. Can I get your contact details?"

This signals to the system that lead capture should begin.

STEP 4: LEAD CAPTURE (After summary)
- After you say "Can I get your contact details?", the UI will show a form
- You don't need to ask for name/email/phone yourself - the form handles it
- If the user responds to your "contact details" question, just acknowledge briefly
- The form will appear automatically after your summary message

🔄 CONVERSATION FLOW CONTROL:
- Track which question you're on internally
- After welcome, start with question 1
- After each answer, acknowledge briefly, then ask next question
- After question 4, generate summary
- After summary, indicate lead capture should happen

💬 RESPONSE STYLE:
- Keep responses under 2 lines when possible
- Be conversational, not robotic
- Show you're listening: "Got it, thanks!" or "That makes sense"
- Never ask multiple questions at once
- Never use technical terms or AI jargon

❌ NEVER:
- Ask for contact details yourself (UI handles this)
- Use more than one emoji per message
- Write long paragraphs
- Use technical jargon
- Skip the conversation structure
`.trim();function getProvider(){let e=process.env.AI_PROVIDER;if(e)return e;if(process.env.OPENAI_API_KEY)return"openai";if(process.env.GEMINI_API_KEY)return"gemini";throw Error("No AI provider configured. Set AI_PROVIDER, OPENAI_API_KEY, or GEMINI_API_KEY.")}function buildMessages(e){let t=e.some(e=>"system"===e.role);return t?e:[{role:"system",content:c},...e]}async function callOpenAI(e){let t=process.env.OPENAI_API_KEY;if(!t)throw Error("OPENAI_API_KEY is missing.");let s=new u.ZP({apiKey:t}),r=process.env.OPENAI_MODEL||"gpt-4o-mini",o=await s.chat.completions.create({model:r,messages:buildMessages(e),temperature:.4});return o.choices[0]?.message?.content?.trim()||"I couldn’t get a response right now."}async function callGemini(e){let t;let s=process.env.GEMINI_API_KEY;if(!s)throw Error("GEMINI_API_KEY is missing.");let r=process.env.GEMINI_MODEL||"gemini-2.0-flash",o=new a.fA({apiKey:s}),i=buildMessages(e),n=i.map(e=>`${"assistant"===e.role?"Assistant":"user"===e.role?"User":"System"}: ${e.content}`).join("\n"),u=await o.models.generateContent({model:r,contents:n});return"string"==typeof u?.text?t=u.text:u?.response?.candidates?.[0]?.content?.parts&&Array.isArray(u.response.candidates[0].content.parts)&&(t=u.response.candidates[0].content.parts.map(e=>e.text||"").join("\n")),t||(t="I couldn’t get a response right now."),t.trim()}async function chatWithAI(e){let t=getProvider();return"openai"===t?callOpenAI(e):callGemini(e)}async function POST(e){try{let t=await e.json(),s=t?.messages||[];if(!Array.isArray(s)||0===s.length)return n.Z.json({error:"No messages provided."},{status:400});let r=await chatWithAI(s);return n.Z.json({reply:r})}catch(t){let e=t instanceof Error?t.message:"Unexpected error";return n.Z.json({error:e},{status:500})}}let l=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"C:\\Users\\sunto\\OneDrive\\Desktop\\projects\\intervieway\\app\\api\\chat\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:p,staticGenerationAsyncStorage:h,serverHooks:m,headerHooks:d,staticGenerationBailout:g}=l,y="/api/chat/route"}};var t=require("../../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[997,96],()=>__webpack_exec__(1136));module.exports=s})();