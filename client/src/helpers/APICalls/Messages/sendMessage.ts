import { FetchOptions } from '../../../interface/FetchOptions';

const sendMessage = async (receiver: string, description: string, conversationId: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ receiver, description, conversationId }),
    credentials: 'include',
  };
  return await fetch(`/conversations/message`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default sendMessage;
