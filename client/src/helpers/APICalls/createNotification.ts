import { FetchOptions } from '../../interface/FetchOptions';

const createNotification = async (type: string, title: string, description: string, receiver: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ type, title, description, receiver }),
  };
  return await fetch(`/notifications/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createNotification;
