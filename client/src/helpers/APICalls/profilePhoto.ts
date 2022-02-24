import { FetchOptions } from '../../interface/FetchOptions';
import { ProfileApiData } from '../../interface/ProfileApiData';

export const profilePhotoUpload = async (file: File): Promise<ProfileApiData> => {
  const formData = new FormData();
  formData.append('image', file);
  const fetchOptions: FetchOptions = {
    method: 'POST',
    body: formData,
    credentials: 'include',
  };
  return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/upload/profile-pic`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const profilePhotoDelete = async (): Promise<ProfileApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'DELETE',
    credentials: 'include',
  };
  return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/delete/profile-pic`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
