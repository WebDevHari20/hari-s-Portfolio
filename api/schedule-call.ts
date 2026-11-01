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

  // Parse body safely
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
  const name = String(body.name || 'Prospect');
  const email = String(body.email || 'Not provided');
  const slot = String(body.slot || 'TBD');

  const configuredKey = process.env.RESEND_API_KEY?.trim();
  const apiKey = configuredKey?.replace(/^(['"])(.*)\1$/, '$2').replace(/^Bearer\s+/i, '').trim();
  if (!apiKey) {
    return res.status(503).json({
      error: 'RESEND_API_KEY is not configured in Vercel. Please add RESEND_API_KEY to your Vercel Project Environment Variables and redeploy.',
    });
  }

  // Sender email configuration:
  // If not configured, or if configured with a public webmail domain (like @gmail.com)
  // which Resend rejects without DNS domain verification, default to Resend's verified onboarding sender.
  let from = process.env.RESEND_FROM_EMAIL?.trim();
  from = from?.replace(/^(['"])(.*)\1$/, '$2').trim();
  if (
    !from ||
    from.includes('@gmail.com') ||
    from.includes('@yahoo.com') ||
    from.includes('@outlook.com') ||
    from.includes('@hotmail.com')
  ) {
    from = 'Portfolio Calls <onboarding@resend.dev>';
  }

  const recipientEmail = process.env.NOTIFICATION_EMAIL?.trim() || 'harinarzary22@gmail.com';

  const emailText = [
    `New 15-minute discovery call booking received at ${timestamp}.`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Selected slot: ${slot}`,
  ].join('\n');

  try {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [recipientEmail],
        subject: `New discovery call booking: ${name}`,
        text: emailText,
        ...(isEmail ? { reply_to: email.trim() } : {}),
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      let parsedMessage = errorText;
      try {
        const parsed = JSON.parse(errorText);
        parsedMessage = parsed.message || parsed.error || errorText;
      } catch {}
      console.error('Resend API rejected booking email:', resendResponse.status, parsedMessage);
      
      let hint = '';
      if (resendResponse.status === 401) {
        const preview = apiKey ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)}` : 'empty';
        hint = ` (Vercel key detected as: ${preview}. Please ensure your valid key from https://resend.com/api-keys is saved in Vercel and trigger a Redeploy)`;
      }

      return res.status(resendResponse.status).json({
        error: `Resend error (${resendResponse.status}): ${parsedMessage}${hint}`,
      });
    }

    const resendData = (await resendResponse.json().catch(() => ({}))) as { id?: string };

    return res.status(200).json({
      success: true,
      emailDelivered: true,
      notifiedEmail: recipientEmail,
      message: 'Call reservation emailed successfully.',
      resendId: resendData.id,
      slot,
      timestamp,
    });
  } catch (error) {
    console.error('Failed to send booking email:', error);
    const message = error instanceof Error ? error.message : 'Unknown network failure';
    return res.status(500).json({
      error: `The booking could not be emailed: ${message}`,
    });
  }
}
