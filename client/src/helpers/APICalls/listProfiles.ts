import { FetchOptions } from '../../interface/FetchOptions';

const listProfiles = async (availability?: string, location?: string) => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'omit',
  };
  return await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/profile/list-profiles/?availability=${availability}&location=${location}`,
    fetchOptions,
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default listProfiles;
