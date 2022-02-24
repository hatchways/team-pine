import { FetchOptions } from '../../../interface/FetchOptions';

const getAllMessages = async (conversationId: string) => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/conversations/${conversationId}/messages`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getAllMessages;
