import { User } from './User';
import { Profile } from './Profile';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  profile: Profile;
  token: string;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
}
