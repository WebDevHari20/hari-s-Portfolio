import { ApiRequest, ApiResponse, HARI_NOTIFICATION_EMAIL, getBody, sendNotificationEmail } from './_lib';

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const body = getBody(request);
  const timestamp = new Date().toISOString();
  const name = String(body.name || 'Prospect');
  const email = String(body.email || 'Not provided');
  const slot = String(body.slot || 'TBD');

  try {
    await sendNotificationEmail({
      subject: `New discovery call booking: ${name}`,
      replyTo: email,
      text: [
        `New 15-minute discovery call booking received at ${timestamp}.`,
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Selected slot: ${slot}`,
      ].join('\n'),
    });
  } catch (error) {
    console.error('Failed to send booking email:', error);
    return response.status(503).json({ error: 'The booking could not be emailed. Please try again or email Hari directly.' });
  }

  return response.status(200).json({
    success: true,
    emailDelivered: true,
    notifiedEmail: HARI_NOTIFICATION_EMAIL,
    message: 'Call reservation emailed successfully.',
    slot,
    timestamp,
  });
}
