import { FetchOptions } from './../../interface/FetchOptions';

const getReviews = async (profileId: string, page: number) => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/reviews/${profileId}?page=${page}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: {
        message: 'Unable to connect to server. Please try again',
      },
    }));
};

export default getReviews;
