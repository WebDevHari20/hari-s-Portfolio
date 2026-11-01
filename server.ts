import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { sendNotificationEmail } from './lib/api';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'dist')));

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

app.post('/api/chat', async (req, res) => {
  try {
    const { history, message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const configuredKey = process.env.GEMINI_API_KEY?.trim();
    const apiKey = configuredKey?.replace(/^(['"])(.*)\1$/, '$2').trim();
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        reply: getLocalFallback(message),
        source: 'local_engine',
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // Prepare multi-turn contents
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-8)) {
          if (item.sender === 'user' && item.text) {
            contents.push({ role: 'user', parts: [{ text: item.text }] });
          } else if (item.sender === 'ai' && item.text) {
            contents.push({ role: 'model', parts: [{ text: item.text }] });
          }
        }
      }

      contents.push({ role: 'user', parts: [{ text: message }] });

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

      const replyText = response.text;
      return res.json({
        reply: replyText,
        source: 'twin_ai',
        model: usedModel,
      });
    } catch (aiErr: any) {
      console.error('Gemini API call failed, falling back to local engine:', aiErr?.message || aiErr);
      return res.json({
        reply: getLocalFallback(message),
        source: 'local_engine_fallback',
      });
    }
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const HARI_NOTIFICATION_EMAIL = 'harinarzary22@gmail.com';
const SUBMISSIONS_DIR = path.resolve(__dirname, 'data');

// Ensure local persistence directory exists
try {
  if (!fs.existsSync(SUBMISSIONS_DIR)) {
    fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('Could not initialize submissions directory:', e);
}

// Contact & Project Brief Submission Endpoint (Zero Activation Required, Instant Persistence)
app.post('/api/contact', async (req, res) => {
  try {
    const { businessName, contactName, contactHandle, currentSite, projectType, timeline, budgetTier, projectLore } = req.body;
    const submissionId = `inq_${Date.now()}`;
    const timestamp = new Date().toISOString();

    const record = {
      id: submissionId,
      timestamp,
      businessName: businessName || 'Not specified',
      contactName: contactName || 'Prospect',
      contactHandle: contactHandle || 'Not provided',
      currentSite: currentSite || 'None',
      projectType: projectType || 'Bespoke Website',
      timeline: timeline || 'Standard',
      budgetTier: budgetTier || 'From $300',
      projectLore: projectLore || 'No notes',
      notifiedEmail: HARI_NOTIFICATION_EMAIL,
    };

    console.log(`\n======================================================`);
    console.log(`[NEW INQUIRY REGISTERED FOR HARI: ${HARI_NOTIFICATION_EMAIL}]`);
    console.log(`Time: ${timestamp}`);
    console.log(`Contact: ${record.contactName} (${record.contactHandle})`);
    console.log(`Business: ${record.businessName}`);
    console.log(`Current Site: ${record.currentSite}`);
    console.log(`Scope: ${record.projectType} | Timeline: ${record.timeline} | Tier: ${record.budgetTier}`);
    console.log(`Project Notes:\n${record.projectLore}`);
    console.log(`======================================================\n`);

    try {
      await sendNotificationEmail({
        subject: `New website inquiry: ${record.businessName}`,
        replyTo: record.contactHandle,
        text: [
          `New website inquiry received at ${timestamp}.`,
          '',
          `Contact: ${record.contactName}`,
          `Email / WhatsApp: ${record.contactHandle}`,
          `Business: ${record.businessName}`,
          `Current website: ${record.currentSite}`,
          `Project type: ${record.projectType}`,
          `Timeline: ${record.timeline}`,
          `Budget: ${record.budgetTier}`,
          '',
          'Project requirements:',
          record.projectLore,
        ].join('\n'),
      });
    } catch (emailErr) {
      console.error('Inquiry email delivery failed:', emailErr);
      const message = emailErr instanceof Error ? emailErr.message : 'Email delivery failed.';
      return res.status(503).json({ error: `The inquiry could not be emailed: ${message}` });
    }

    // Persist to local JSON database file
    try {
      const filePath = path.join(SUBMISSIONS_DIR, 'inquiries.json');
      let currentRecords: any[] = [];
      if (fs.existsSync(filePath)) {
        try {
          currentRecords = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch {
          currentRecords = [];
        }
      }
      currentRecords.unshift(record);
      fs.writeFileSync(filePath, JSON.stringify(currentRecords, null, 2), 'utf-8');
    } catch (saveErr) {
      console.warn('File persist warning:', saveErr);
    }

    return res.json({
      success: true,
      emailDelivered: true,
      activationRequired: false,
      notifiedEmail: HARI_NOTIFICATION_EMAIL,
      message: `Inquiry successfully recorded for Hari (${HARI_NOTIFICATION_EMAIL})`,
      timestamp,
    });
  } catch (err: any) {
    console.error('Error handling /api/contact:', err);
    return res.status(500).json({ error: 'Failed to process inquiry' });
  }
});

// Intro Discovery Call Booking Endpoint (Zero Activation Required, Instant Persistence)
app.post('/api/schedule-call', async (req, res) => {
  try {
    const { name, email, slot } = req.body;
    const bookingId = `book_${Date.now()}`;
    const timestamp = new Date().toISOString();

    const booking = {
      id: bookingId,
      timestamp,
      name: name || 'Prospect',
      email: email || 'Not provided',
      slot: slot || 'TBD',
      protocol: 'Google Meet (15-Minute Technical Discovery)',
      host: `Hari Bahadur Narzary (${HARI_NOTIFICATION_EMAIL})`,
    };

    console.log(`\n======================================================`);
    console.log(`[DISCOVERY CALL BOOKED FOR HARI: ${HARI_NOTIFICATION_EMAIL}]`);
    console.log(`Time: ${timestamp}`);
    console.log(`Prospect: ${booking.name} | Email: ${booking.email}`);
    console.log(`Confirmed Slot: ${booking.slot}`);
    console.log(`======================================================\n`);

    try {
      await sendNotificationEmail({
        subject: `New discovery call booking: ${booking.name}`,
        replyTo: booking.email,
        text: [
          `New 15-minute discovery call booking received at ${timestamp}.`,
          '',
          `Name: ${booking.name}`,
          `Email: ${booking.email}`,
          `Selected slot: ${booking.slot}`,
        ].join('\n'),
      });
    } catch (emailErr) {
      console.error('Booking email delivery failed:', emailErr);
      const message = emailErr instanceof Error ? emailErr.message : 'Email delivery failed.';
      return res.status(503).json({ error: `The booking could not be emailed: ${message}` });
    }

    // Persist to local JSON database file
    try {
      const filePath = path.join(SUBMISSIONS_DIR, 'bookings.json');
      let currentBookings: any[] = [];
      if (fs.existsSync(filePath)) {
        try {
          currentBookings = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch {
          currentBookings = [];
        }
      }
      currentBookings.unshift(booking);
      fs.writeFileSync(filePath, JSON.stringify(currentBookings, null, 2), 'utf-8');
    } catch (saveErr) {
      console.warn('Booking persist warning:', saveErr);
    }

    return res.json({
      success: true,
      emailDelivered: true,
      activationRequired: false,
      notifiedEmail: HARI_NOTIFICATION_EMAIL,
      message: `Call reservation confirmed for Hari (${HARI_NOTIFICATION_EMAIL})`,
      slot,
      timestamp,
    });
  } catch (err: any) {
    console.error('Error handling /api/schedule-call:', err);
    return res.status(500).json({ error: 'Failed to schedule call' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Mount Vite middlewares in development
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
