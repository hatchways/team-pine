import { FetchOptions } from './../../interface/FetchOptions';

const createRequest = async (sitter: string, startDate: Date, endDate: Date) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ sitter, startDate, endDate }),
  };
  return await fetch(`/requests/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createRequest;
