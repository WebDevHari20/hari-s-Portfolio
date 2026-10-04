import type { IncomingMessage, ServerResponse } from 'http';
import { GoogleGenAI } from '@google/genai';

interface VercelReq extends IncomingMessage {
  body?: unknown;
  query?: Record<string, string | string[]>;
}

interface VercelRes extends ServerResponse {
  status: (code: number) => VercelRes;
  json: (body: unknown) => VercelRes;
  send: (body: unknown) => VercelRes;
}

const HARI_SYSTEM_INSTRUCTION = `You are Hari Bahadur Narzary's official AI Developer Twin.
You represent Hari Bahadur Narzary, a senior full-stack web developer and architect based in Assam, India.
Never mention Gemini, Google, LLM, or internal AI model names. If asked who you are, say you are Hari's AI Developer Twin.
Pricing starts at $300. Keep responses concise, practical, and focused on Hari's web engineering services.
Hari deploys production sites to Vercel or AWS edge hosting with Cloudflare DNS. Deployment includes connecting the Git repository, configuring environment variables, connecting the custom domain, setting DNS records, and verifying the production build. Clients receive ownership of the repository, domain, and hosting account.`;

function getLocalFallback(query: string): string {
  const lower = query.toLowerCase();
  if (
    lower.includes('host') ||
    lower.includes('deploy') ||
    lower.includes('vercel') ||
    lower.includes('domain') ||
    lower.includes('dns')
  ) {
    return 'Hari deploys production sites to Vercel or AWS edge hosting with Cloudflare DNS. The client receives ownership of the Git repository, domain, and hosting account. Deployment includes connecting the repository, configuring environment variables, adding the custom domain, setting DNS records, and verifying the production build. You can renew and manage hosting yourself, or choose optional maintenance at around $99–$100/month.';
  }
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

export default async function handler(req: VercelReq, res: VercelRes) {
  res.setHeader?.('Access-Control-Allow-Origin', '*');
  res.setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader?.('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ status: 'ok' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body: Record<string, unknown> = {};
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        body = JSON.parse(req.body);
      } catch {
        body = {};
      }
    } else if (typeof req.body === 'object') {
      body = req.body as Record<string, unknown>;
    }
  }

  const message = typeof body.message === 'string' ? body.message : '';
  if (!message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const configuredKey = process.env.GEMINI_API_KEY?.trim();
  const apiKey = configuredKey?.replace(/^(['"])(.*)\1$/, '$2').trim();

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return res.status(200).json({ reply: getLocalFallback(message), source: 'local_engine' });
  }

  try {
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(body.history)) {
      for (const item of body.history.slice(-8)) {
        if (!item || typeof item !== 'object') continue;
        const entry = item as { sender?: string; text?: string };
        if (entry.text && entry.sender === 'user') contents.push({ role: 'user', parts: [{ text: entry.text }] });
        if (entry.text && entry.sender === 'ai') contents.push({ role: 'model', parts: [{ text: entry.text }] });
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: HARI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    });

    return res.status(200).json({
      reply: response.text || getLocalFallback(message),
      source: 'twin_ai',
    });
  } catch (error) {
    console.error('Gemini API call failed, using local fallback:', error);
    return res.status(200).json({
      reply: getLocalFallback(message),
      source: 'local_engine_fallback',
    });
  }
}
