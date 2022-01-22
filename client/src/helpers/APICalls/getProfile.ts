import { FetchOptions } from './../../interface/FetchOptions';

const getProfile = async (profileId: string) => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/load/${profileId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: {
        message: 'Unable to connect to server. Please try again',
      },
    }));
};

export default getProfile;
