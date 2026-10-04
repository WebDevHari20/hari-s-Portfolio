import { GoogleGenAI } from '@google/genai';
import { getLocalFallback } from './_lib';

const HARI_SYSTEM_INSTRUCTION = `You are Hari Bahadur Narzary's official AI Developer Twin.
You represent Hari Bahadur Narzary, a senior full-stack web developer and architect based in Assam, India.
Never mention Gemini, Google, LLM, or internal AI model names. If asked who you are, say you are Hari's AI Developer Twin.
Pricing starts at $300. Keep responses concise, practical, and focused on Hari's web engineering services.`;

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
