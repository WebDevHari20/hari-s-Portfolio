import { GoogleGenAI } from '@google/genai';

export interface ApiRequest {
  body?: unknown;
  method?: string;
}

export interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
}

export const HARI_NOTIFICATION_EMAIL = 'harinarzary22@gmail.com';

const HARI_SYSTEM_INSTRUCTION = `You are Hari Bahadur Narzary's official AI Developer Twin.
You represent Hari Bahadur Narzary, a senior full-stack web developer and architect based in Assam, India.
Never mention Gemini, Google, LLM, or internal AI model names. If asked who you are, say you are Hari's AI Developer Twin.
Pricing starts at $300. Keep responses concise, practical, and focused on Hari's web engineering services.`;

export function getLocalFallback(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes('maintenance') || lower.includes('maintain') || lower.includes('monthly') || lower.includes('ownership')) {
    return 'You have two options: monthly maintenance care (~₹10k / ~$99–$100/mo), or zero maintenance fee with 100% ownership of the website, code, domain, and hosting accounts.';
  }
  if (lower.includes('gemini') || lower.includes('what ai') || lower.includes('what model') || lower.includes('who are you')) {
    return "I am Hari Bahadur Narzary's official AI Developer Twin, trained on Hari's web architecture workflow, pricing, and full-stack client builds.";
  }
  if (lower.includes('cost') || lower.includes('price') || lower.includes('pricing') || lower.includes('budget')) {
    return 'Websites start at $300. Starter sites range from $300 to $1,200, growth setups from $1,200 to $2,800, and custom web apps from $3,500+.';
  }
  if (lower.includes('timeline') || lower.includes('turnaround') || lower.includes('how fast')) {
    return 'Standard delivery is 10 to 14 calendar days, with a 1-week rush sprint option available.';
  }
  return `Regarding "${query}": Hari builds high-performance websites with mobile responsiveness and 100% code ownership, starting from $300.`;
}

export async function createChatReply(message: string, history: unknown): Promise<{ reply: string; source: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || !apiKey.trim()) {
    return { reply: getLocalFallback(message), source: 'local_engine' };
  }

  try {
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) {
        if (!item || typeof item !== 'object') continue;
        const entry = item as { sender?: string; text?: string };
        if (entry.text && entry.sender === 'user') contents.push({ role: 'user', parts: [{ text: entry.text }] });
        if (entry.text && entry.sender === 'ai') contents.push({ role: 'model', parts: [{ text: entry.text }] });
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: { systemInstruction: HARI_SYSTEM_INSTRUCTION, temperature: 0.7, maxOutputTokens: 600 },
    });
    return { reply: response.text || getLocalFallback(message), source: 'twin_ai' };
  } catch (error) {
    console.warn('AI API call failed, using local fallback:', error);
    return { reply: getLocalFallback(message), source: 'local_engine_fallback' };
  }
}

export function getBody(request: ApiRequest): Record<string, unknown> {
  return request.body && typeof request.body === 'object' ? request.body as Record<string, unknown> : {};
}
