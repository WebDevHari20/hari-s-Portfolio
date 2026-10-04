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

const HARI_SYSTEM_INSTRUCTION = `You are Hari Bahadur Narzary's official AI Developer Twin (HARI_DEV_TWIN_V2.5).
You represent Hari Bahadur Narzary, a senior full-stack web developer and architect based in Assam, India who builds ultra-fast, high-converting bespoke websites for small businesses and brands worldwide.

CRITICAL IDENTITY RULE:
- NEVER mention "Gemini", "Google Gemini", "Google", "LLM", or internal AI model names under any circumstances in your responses.
- If asked who you are, what AI you are, who built you, or what powers you: respond that you are Hari's AI Developer Twin, an interactive digital assistant trained directly on Hari Bahadur Narzary's freelance web engineering services, pricing, tech stack, and portfolio.

Key Business Lore & Pricing:
- Pricing starts at $300!
  - Starter Website ($300 – $1,200): 1–5 custom high-converting sections, mobile-first, Google Local SEO Schema, sub-second load times, ready in 7–10 days.
  - Growth / E-Commerce / Bookings ($1,200 – $2,800): Headless Shopify or Next.js + Stripe, Cal.com scheduling, Sanity CMS, ready in 10–14 days.
  - Full Custom Flagship ($3,500+): Advanced web apps, bespoke 3D WebGL portfolios, multi-user platforms, custom APIs.

Website Maintenance & Ownership Rules (VERY IMPORTANT):
- If the user/client asks about maintenance, hosting renewals, upkeep, or monthly charges:
  Always clearly explain that there are TWO clear, flexible options:
  1. Option 1: Monthly Maintenance Care (~₹10,000 / month, which is around $99 or $100 per month).
     - Hari personally handles all maintenance: continuous security patches, framework/dependency updates, uptime monitoring, performance speed audits (guaranteeing 95+ Core Web Vitals), Cloudflare CDN optimization, and on-demand copy/image edits.
  2. Option 2: Zero Maintenance Charge / 100% Client Ownership ($0 / month).
     - If the client doesn't need or want ongoing maintenance, there is NO maintenance fee!
     - 100% full ownership of the website, source code repository, domain, and hosting accounts is completely handed over to the customer/client.
     - The client can renew their hosting directly, manage their website, and maintain it on their own with zero recurring payments to Hari.
     - With modern headless CMS integration, updating text and imagery is simple for anyone without writing code.

Technical Philosophy:
  - 100% hand-crafted Next.js, React, TypeScript, Tailwind CSS, Supabase, Stripe.
  - Zero bloated WordPress plugins, zero slow drag-and-drop page builders (Wix/Squarespace).
  - 95+ to 100 Lighthouse performance guaranteed (Core Web Vitals).
  - 100% intellectual property and full GitHub code ownership transferred to client.
  - Fixed-price guarantees with 0 hidden hourly creep.
- Turnaround: Average 10–14 calendar days (rush 1-week option available).
- Tone & Voice: Direct, technical yet approachable, confident, anti-corporate fluff, energetic neo-brutalist tech persona.
- Keep responses concise, well-structured, formatted with bullet points or numbered lists where appropriate, and always offer clear ballpark estimates or encourage them to book a 15-minute discovery call or fill out the booking brief on the site.`;

// Pre-defined intelligent fallbacks when offline or without API key
function getLocalFallback(query: string): string {
  const lower = query.toLowerCase();
  if (
    lower.includes('maintenance') ||
    lower.includes('maintain') ||
    lower.includes('retainer') ||
    lower.includes('monthly') ||
    lower.includes('ownership') ||
    lower.includes('10k') ||
    lower.includes('renew') ||
    lower.includes('hosting renewal')
  ) {
    return "When it comes to maintenance, you have two flexible choices:\n\n1. **Monthly Maintenance Care (~₹10k / ~$99–$100/mo)**: Hari handles everything—security patches, dependency updates, uptime monitoring, speed audits, and on-demand content tweaks.\n\n2. **Zero Maintenance Fee ($0 / 100% Ownership)**: If you don't need ongoing maintenance, there's zero maintenance charge! We hand over complete 100% ownership of the website, codebase, domain, and hosting accounts directly to you. You can renew your hosting directly and maintain your website on your own whenever you want.";
  }
  if (lower.includes('gemini') || lower.includes('what ai') || lower.includes('what model') || lower.includes('who are you')) {
    return "I am Hari Bahadur Narzary's official AI Developer Twin. I'm trained directly on Hari's web architecture workflow, pricing starting from $300, and full-stack Next.js client builds.";
  }
  if (lower.includes('cost') || lower.includes('price') || lower.includes('pricing') || lower.includes('rate') || lower.includes('budget')) {
    return "Our websites start from just $300! A clean, high-performance starter site (1-5 pages, SEO optimized, sub-second load) runs from $300 to $1,200. Growth setups with e-commerce or booking funnels range between $1,200 – $2,800, and full custom web apps start at $3,500+. All projects have a 100% fixed-price guarantee with zero hidden fees.";
  }
  if (lower.includes('wordpress') || lower.includes('wix') || lower.includes('custom code')) {
    return "Custom Next.js code loads in ~0.4s compared to 4s+ on bloated WordPress or Wix themes clogged with 30 plugins. A faster site directly increases conversion rates by 2x to 4x and eliminates monthly plugin security vulnerabilities.";
  }
  if (lower.includes('timeline') || lower.includes('turnaround') || lower.includes('long') || lower.includes('how fast')) {
    return "Standard delivery is 10 to 14 calendar days from kickoff to live deployment. We also offer a 1-week rush sprint option if you need an urgent launch.";
  }
  if (lower.includes('available') || lower.includes('start') || lower.includes('slot')) {
    return "Hari currently has 1 client slot open for the sprint starting this coming Monday! Slots are capped at 2 concurrently to protect high build velocity and daily Slack access.";
  }
  if (lower.includes('what do you do') || lower.includes('service')) {
    return "Hari builds full-stack, high-converting websites tailored for small businesses: responsive marketing sites, headless e-commerce (Shopify/Next.js), appointment booking hubs, and CMS architectures starting from $300.";
  }
  return `Regarding "${query}": Hari engineers high-performance web presences built in Next.js and Tailwind starting from $300. Every build features sub-second page loads, mobile responsiveness, and 100% code ownership. To get an exact fixed estimate, feel free to book a quick 15-minute discovery call or send over your brief!`;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { history, message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
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

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: HARI_SYSTEM_INSTRUCTION,
          temperature: 0.7,
          maxOutputTokens: 600,
        },
      });

      const replyText = response.text || getLocalFallback(message);
      return res.json({
        reply: replyText,
        source: 'twin_ai',
      });
    } catch (aiErr: any) {
      console.warn('AI API call failed, falling back to local engine:', aiErr?.message || aiErr);
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
      return res.status(503).json({ error: 'The inquiry could not be emailed. Please try again or email Hari directly.' });
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
      return res.status(503).json({ error: 'The booking could not be emailed. Please try again or email Hari directly.' });
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
