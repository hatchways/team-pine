import { FetchOptions } from './../../interface/FetchOptions';

const getReviews = async (profileId: string) => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/reviews/${profileId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: {
        message: 'Unable to connect to server. Please try again',
      },
    }));
};

export default getReviews;
