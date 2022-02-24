import { FetchOptions } from '../../interface/FetchOptions';

const markNotificationAsRead = async (notificationId: string) => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
  };
  return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/notification/mark-read/${notificationId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default markNotificationAsRead;
