import { FetchOptions } from './../../interface/FetchOptions';

const sendPasswordResetEmail = async (email: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    body: JSON.stringify({ email }),
  };
  return await fetch(`/auth/send-password-reset`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default sendPasswordResetEmail;
