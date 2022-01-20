import { FetchOptions } from '../../../interface/FetchOptions';

const createConversation = async (receiver: string, description: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ receiver, description }),
    credentials: 'include',
  };
  return await fetch(`/conversations/create-conversation/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createConversation;
