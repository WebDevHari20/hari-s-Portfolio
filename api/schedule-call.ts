import { ApiRequest, ApiResponse, HARI_NOTIFICATION_EMAIL, getBody } from './_lib';

export default function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const body = getBody(request);
  console.log('New discovery call booking', {
    timestamp: new Date().toISOString(),
    name: body.name || 'Prospect',
    email: body.email || 'Not provided',
    slot: body.slot || 'TBD',
  });
  return response.status(200).json({
    success: true,
    emailDelivered: false,
    notifiedEmail: HARI_NOTIFICATION_EMAIL,
    message: 'Call reservation confirmed.',
    slot: body.slot || 'TBD',
    timestamp: new Date().toISOString(),
  });
}
