import { GoogleGenAI } from "@google/genai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
})

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(30, '60 s'), // 5 requests in 10 seconds
  });
  
export async function POST(
    req: Request,
) {
    if(!process.env.GEMINI_API_KEY) {
        return Response.json({
            error: "API key not found",
        }, { status: 500 })
    }

    const { success } = await rateLimit.limit('mushfiqah-portfolio-gemini-api');
    if (!success) {
      return Response.json({
        error: "Rate limit exceeded. Try again later.",
        isLimitExceeded: true,
      }, { status: 429 });
    }
    
    const body = await req.json();

    const promptDetails = await fetch('https://3yxxme9l.api.sanity.io/v2025-04-26/data/query/production?query=*%5B_type+%3D%3D+%27promptInfo%27%5D+%7B%0A++prompt%0A%7D%5B0%5D&perspective=drafts')

    const promptData = await promptDetails.json();

    const FINAL_PROMPT = `
        ${promptData?.result?.prompt}
        ${body.text}
    `

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: FINAL_PROMPT,
      });
      

    const { text } = response;

    if (!text) {
        return Response.json({
            error: "No content found",
        }, { status: 500 })
    }

    return Response.json({
        content: text,
    }, { status: 200 })
    
  
}