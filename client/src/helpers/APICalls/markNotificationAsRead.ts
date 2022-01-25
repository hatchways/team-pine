import { FetchOptions } from '../../interface/FetchOptions';

const markNotificationAsRead = async (notificationId: string) => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
  };
  return await fetch(`/notifications/${notificationId}/mark-read/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default markNotificationAsRead;
