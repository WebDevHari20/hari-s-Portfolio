import { ApiRequest, ApiResponse, createChatReply, getBody } from './_lib';

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const body = getBody(request);
  const message = body.message;
  if (typeof message !== 'string' || !message.trim()) {
    return response.status(400).json({ error: 'Message is required' });
  }
  return response.status(200).json(await createChatReply(message, body.history));
}
