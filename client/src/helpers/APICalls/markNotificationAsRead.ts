import { FetchOptions } from '../../interface/FetchOptions';

const markNotificationAsRead = async (notificationId: string) => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
  };
  return await fetch(`/notification/mark-read/${notificationId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default markNotificationAsRead;
