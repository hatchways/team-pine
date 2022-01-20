import { FetchOptions } from '../../interface/FetchOptions';

const listProfiles = async (location?: string, availability?: string) => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'omit',
  };
  return await fetch(`/profile/${location}/${availability}/list-profiles`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default listProfiles;
