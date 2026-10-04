import { ApiRequest, ApiResponse, HARI_NOTIFICATION_EMAIL, getBody } from './_lib';

export default function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const body = getBody(request);
  console.log('New portfolio inquiry', {
    timestamp: new Date().toISOString(),
    businessName: body.businessName || 'Not specified',
    contactName: body.contactName || 'Prospect',
    contactHandle: body.contactHandle || 'Not provided',
    projectType: body.projectType || 'Bespoke Website',
    budgetTier: body.budgetTier || 'From $300',
  });
  return response.status(200).json({
    success: true,
    emailDelivered: false,
    notifiedEmail: HARI_NOTIFICATION_EMAIL,
    message: 'Inquiry successfully recorded.',
    timestamp: new Date().toISOString(),
  });
}
