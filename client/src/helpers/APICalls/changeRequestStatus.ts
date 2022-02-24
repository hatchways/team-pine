import { FetchOptions } from './../../interface/FetchOptions';

const changeRequestStatus = async (requestId: string, status: string) => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ status }),
  };
  return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/requests/edit/${requestId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default changeRequestStatus;
