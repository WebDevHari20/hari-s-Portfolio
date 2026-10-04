export interface ApiRequest {
  body?: unknown;
  method?: string;
}

export interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
}

export const HARI_NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL?.trim() || 'harinarzary22@gmail.com';

interface EmailOptions {
  subject: string;
  text: string;
  replyTo?: string;
}

export async function sendNotificationEmail({ subject, text, replyTo }: EmailOptions): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('Email service is not configured. Set RESEND_API_KEY in your environment variables.');
  }

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

  const recipient = HARI_NOTIFICATION_EMAIL;

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject,
      text,
      ...(replyTo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo) ? { reply_to: replyTo } : {}),
    }),
  });

  if (!emailResponse.ok) {
    const details = await emailResponse.text();
    let parsedMessage = details;
    try {
      const parsed = JSON.parse(details);
      parsedMessage = parsed.message || parsed.error || details;
    } catch {}
    throw new Error(`Email provider rejected the message (${emailResponse.status}): ${parsedMessage}`);
  }
}

export function getLocalFallback(query: string): string {
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

export function getBody(request: ApiRequest): Record<string, unknown> {
  if (!request.body) return {};
  if (typeof request.body === 'string') {
    try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }
  return typeof request.body === 'object' ? (request.body as Record<string, unknown>) : {};
}
