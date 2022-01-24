import { FetchOptions } from '../../interface/FetchOptions';
interface ClientSecretAPIData {
  success?: {
    client_secret?: string;
  };
  error?: { message: string };
}
export interface Card {
  brand: string;
  exp_month: number;
  exp_year: number;
  last4: string;
  name: string | null;
  country: string;
}
export interface PaymentMethod {
  id: string;
  customer: string;
  type: string;
  card: Card;
}
interface SavedCardsAPIData {
  success?: {
    payment_methods: PaymentMethod[];
  };
  error?: { message: string };
}
export const fetchClientSecret = async (): Promise<ClientSecretAPIData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/payments/secret`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const fetchSavedCards = async (): Promise<SavedCardsAPIData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/payments/saved-cards`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
