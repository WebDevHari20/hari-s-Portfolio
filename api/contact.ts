import { ApiRequest, ApiResponse, HARI_NOTIFICATION_EMAIL, getBody, sendNotificationEmail } from '../lib/api';

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const body = getBody(request);
  const timestamp = new Date().toISOString();
  const businessName = String(body.businessName || 'Not specified');
  const contactName = String(body.contactName || 'Prospect');
  const contactHandle = String(body.contactHandle || 'Not provided');
  const projectType = String(body.projectType || 'Bespoke Website');
  const timeline = String(body.timeline || 'Standard');
  const budgetTier = String(body.budgetTier || 'From $300');
  const currentSite = String(body.currentSite || 'None');
  const projectLore = String(body.projectLore || 'No notes');

  try {
    await sendNotificationEmail({
      subject: `New website inquiry: ${businessName}`,
      replyTo: contactHandle,
      text: [
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
      ].join('\n'),
    });
  } catch (error) {
    console.error('Failed to send inquiry email:', error);
    return response.status(503).json({ error: 'The inquiry could not be emailed. Please try again or email Hari directly.' });
  }

  return response.status(200).json({
    success: true,
    emailDelivered: true,
    notifiedEmail: HARI_NOTIFICATION_EMAIL,
    message: 'Inquiry emailed successfully.',
    timestamp,
  });
}
