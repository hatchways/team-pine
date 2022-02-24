import { FetchOptions } from '../../interface/FetchOptions';

const getProfiles = async (location: string, dropIn: Date, dropOff: Date) => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
    body: JSON.stringify({ location, dropIn, dropOff }),
  };
  return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/profiles/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getProfiles;
