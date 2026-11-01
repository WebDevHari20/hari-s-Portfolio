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

const HARI_SYSTEM_INSTRUCTION = `You are Hari Bahadur Narzary's official AI Twin — an interactive digital assistant representing Hari on his portfolio website.

ABOUT HARI:
Hari Bahadur Narzary is a Generative AI Engineer from Assam, India. He specializes in building production-grade AI systems including:
- LLM-powered applications (GPT-4, Claude, Gemini, Llama, Mistral)
- RAG (Retrieval-Augmented Generation) pipelines with vector databases (Pinecone, Weaviate, ChromaDB)
- Multi-agent orchestration frameworks (CrewAI, AutoGen, LangGraph)
- LLM fine-tuning (LoRA, QLoRA) and model optimization (ONNX, vLLM, TGI)
- Full-stack AI product engineering (FastAPI, Next.js, Python, TypeScript)
- ML pipeline infrastructure (Docker, AWS/GCP, CI/CD, Weights & Biases)

KEY PROJECTS:
- RAG Knowledge Engine: Enterprise document Q&A with hybrid search and semantic chunking
- Multi-Agent Orchestrator: Framework for autonomous task decomposition and execution
- LLM Fine-tuning Pipeline: Scalable training infrastructure with LoRA/QLoRA
- AI Code Reviewer: GitHub integration for automated PR analysis using LLMs
- Conversational AI Platform: Full-stack chatbot builder with custom knowledge bases
- Semantic Search Engine: Sub-100ms neural retrieval over million-doc corpora

IDENTITY RULES:
- If asked who you are: You are Hari's AI Twin, an interactive assistant on his portfolio.
- Be technical, concise, and enthusiastic about AI/ML.
- Answer questions about Hari's skills, projects, experience, and availability.
- Hari is open to freelance work, full-time opportunities, and collaborations in the Gen AI space.
- Be friendly and approachable while maintaining technical credibility.
- If asked about something outside Hari's domain, redirect to his AI/ML expertise.

RESPONSE STRUCTURE & FORMATTING RULES (STRICT):
- ALWAYS produce structured, clean replies with distinct paragraphs and bullet points. NEVER output a continuous wall of text.
- When listing projects, tech stacks, or features, structure your response as:
  1. A brief 1-line opening sentence.
  2. Separate bullet items using '* **[Name]:** [1 concise sentence]' with newline breaks between each item.
  3. A brief 1-line closing or invitation to ask more.
- Keep each point punchy and easy to scan on mobile and desktop screens.`;

// Pre-defined intelligent fallbacks when offline or without API key
function getLocalFallback(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes('project') || lower.includes('built') || lower.includes('portfolio')) {
    return "Hari has built several production AI systems:\n\n• **RAG Knowledge Engine** — Enterprise document Q&A with hybrid search and semantic chunking (LangChain + Pinecone + GPT-4)\n• **Multi-Agent Orchestrator** — Framework for autonomous task decomposition using CrewAI and AutoGen\n• **LLM Fine-tuning Pipeline** — Scalable LoRA/QLoRA training infrastructure with automated evaluation\n• **AI Code Reviewer** — GitHub integration for automated PR analysis\n• **Conversational AI Platform** — Full-stack chatbot builder with custom knowledge bases\n• **Semantic Search Engine** — Sub-100ms neural retrieval over million-doc corpora";
  }
  if (lower.includes('stack') || lower.includes('tech') || lower.includes('tool') || lower.includes('skill')) {
    return "Hari's core tech stack includes:\n\n**LLMs & Frameworks:** GPT-4, Claude, Gemini, Llama, Mistral, LangChain, LlamaIndex, Hugging Face\n**AI Agents & RAG:** CrewAI, AutoGen, Pinecone, Weaviate, ChromaDB\n**ML & Training:** PyTorch, Transformers, LoRA/QLoRA, ONNX, vLLM, Weights & Biases\n**Engineering:** Python, TypeScript, FastAPI, Next.js, Docker, AWS/GCP, CI/CD";
  }
  if (lower.includes('rag') || lower.includes('retrieval')) {
    return "Hari has deep experience with RAG pipelines. His RAG Knowledge Engine handles enterprise document Q&A with hybrid search (BM25 + vector), semantic chunking, re-ranking, and achieves 95%+ answer accuracy. He uses Pinecone, Weaviate, or ChromaDB depending on the use case, paired with LangChain or LlamaIndex for orchestration.";
  }
  if (lower.includes('agent') || lower.includes('multi-agent') || lower.includes('crew')) {
    return "Hari builds multi-agent systems using CrewAI, AutoGen, and LangGraph. His Multi-Agent Orchestrator is a production framework where multiple AI agents collaboratively break down, plan, and execute complex workflows — from code generation to research synthesis — with tool-use and persistent memory.";
  }
  if (lower.includes('fine-tun') || lower.includes('train') || lower.includes('lora')) {
    return "Hari has fine-tuned 10+ open-source LLMs (Llama, Mistral) for specialized domains using LoRA/QLoRA. His pipeline includes automated dataset curation, training with PyTorch + Hugging Face, evaluation with custom benchmarks, and one-click deployment via vLLM or TGI. He tracks everything with Weights & Biases.";
  }
  if (lower.includes('available') || lower.includes('hire') || lower.includes('freelance') || lower.includes('work') || lower.includes('opportunit')) {
    return "Yes! Hari is open to freelance work, full-time opportunities, and collaborations in the Gen AI space. Whether you need help with LLM integration, RAG pipelines, agent systems, or full-stack AI products — feel free to reach out via the contact form on this site!";
  }
  if (lower.includes('who') || lower.includes('about') || lower.includes('yourself')) {
    return "I'm Hari Bahadur Narzary's AI Twin — an interactive assistant on his portfolio. Hari is a Generative AI Engineer from Assam, India, specializing in LLMs, RAG pipelines, multi-agent systems, and production ML infrastructure. He builds intelligent systems that solve real-world problems.";
  }
  return `Hari is a Generative AI Engineer specializing in LLMs, RAG, multi-agent systems, and production ML. To learn more about his specific experience with "${query}", feel free to explore his projects section or send a message through the contact form!`;
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
    const candidates = ['gemini-3.1-flash-lite', 'gemini-3.5-flash-lite', 'gemini-3-flash-preview'];
    let response: any = null;
    let usedModel = '';

    for (const model of candidates) {
      try {
        response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: HARI_SYSTEM_INSTRUCTION,
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        });
        if (response?.text) {
          usedModel = model;
          break;
        }
      } catch (modelErr: any) {
        console.warn(`Model ${model} failed, trying next fallback:`, modelErr?.message || modelErr);
      }
    }

    if (!response?.text) {
      throw new Error('All Gemini candidate models failed to return content');
    }

    return res.status(200).json({
      reply: response.text,
      source: 'twin_ai',
      model: usedModel,
    });
  } catch (error) {
    console.error('Gemini API call failed, using local fallback:', error);
    return res.status(200).json({
      reply: getLocalFallback(message),
      source: 'local_engine_fallback',
    });
  }
}
