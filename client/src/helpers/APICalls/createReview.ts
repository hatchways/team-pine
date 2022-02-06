import { FetchOptions } from './../../interface/FetchOptions';

const createReview = async (profileId: string, rating: number, text: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ rating, text }),
  };
  return await fetch(`/reviews/${profileId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createReview;
