import type { IncomingMessage, ServerResponse } from 'http';

interface VercelReq extends IncomingMessage {
  body?: unknown;
  query?: Record<string, string | string[]>;
}

interface VercelRes extends ServerResponse {
  status: (code: number) => VercelRes;
  json: (body: unknown) => VercelRes;
  send: (body: unknown) => VercelRes;
}

export default async function handler(req: VercelReq, res: VercelRes) {
  // CORS & Preflight handling
  res.setHeader?.('Access-Control-Allow-Origin', '*');
  res.setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader?.('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ status: 'ok' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse body safely whether passed as object or JSON string
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

  const timestamp = new Date().toISOString();
  const businessName = String(body.businessName || 'Not specified');
  const contactName = String(body.contactName || 'Prospect');
  const contactHandle = String(body.contactHandle || 'Not provided');
  const projectType = String(body.projectType || 'Bespoke Website');
  const timeline = String(body.timeline || 'Standard');
  const budgetTier = String(body.budgetTier || 'From $300');
  const currentSite = String(body.currentSite || 'None');
  const projectLore = String(body.projectLore || 'No notes');

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return res.status(503).json({
      error: 'RESEND_API_KEY is not configured in Vercel. Please add RESEND_API_KEY to your Vercel Project Environment Variables and redeploy.',
    });
  }

  // Sender email configuration:
  // If not configured, or if configured with a public webmail domain (like @gmail.com)
  // which Resend rejects without DNS domain verification, default to Resend's verified onboarding sender.
  let from = process.env.RESEND_FROM_EMAIL?.trim();
  if (
    !from ||
    from.includes('@gmail.com') ||
    from.includes('@yahoo.com') ||
    from.includes('@outlook.com') ||
    from.includes('@hotmail.com')
  ) {
    from = 'Portfolio Inquiry <onboarding@resend.dev>';
  }

  const recipientEmail = process.env.NOTIFICATION_EMAIL?.trim() || 'harinarzary22@gmail.com';

  const emailText = [
    `New website inquiry received at ${timestamp}.`,
    '',
    `Contact: ${contactName}`,
    `Email / WhatsApp: ${contactHandle}`,
    `Business: ${businessName}`,
    `Current website: ${currentSite}`,
    `Project type: ${projectType}`,
    `Timeline: ${timeline}`,
    `Budget: ${budgetTier}`,
    '',
    'Project requirements:',
    projectLore,
  ].join('\n');

  try {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactHandle.trim());
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [recipientEmail],
        subject: `New website inquiry: ${businessName}`,
        text: emailText,
        ...(isEmail ? { reply_to: contactHandle.trim() } : {}),
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      let parsedMessage = errorText;
      try {
        const parsed = JSON.parse(errorText);
        parsedMessage = parsed.message || parsed.error || errorText;
      } catch {}
      console.error('Resend API rejected inquiry:', resendResponse.status, parsedMessage);
      return res.status(resendResponse.status).json({
        error: `Resend error (${resendResponse.status}): ${parsedMessage}`,
      });
    }

    const resendData = (await resendResponse.json().catch(() => ({}))) as { id?: string };

    return res.status(200).json({
      success: true,
      emailDelivered: true,
      notifiedEmail: recipientEmail,
      message: 'Inquiry emailed successfully.',
      resendId: resendData.id,
      timestamp,
    });
  } catch (error) {
    console.error('Failed to send inquiry email:', error);
    const message = error instanceof Error ? error.message : 'Unknown network failure';
    return res.status(500).json({
      error: `The inquiry could not be emailed: ${message}`,
    });
  }
}
