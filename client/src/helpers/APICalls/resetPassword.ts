import { FetchOptions } from '../../interface/FetchOptions';

const resetPassword = async (password: string, email: string, token: string) => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    body: JSON.stringify({ password, email, token }),
  };
  return await fetch(`/auth/reset-password`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default resetPassword;
