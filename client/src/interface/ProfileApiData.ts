import { Profile } from './Profile';

export interface ProfileApiDataSuccess {
  profile: Profile;
}

export interface ProfileApiData {
  error?: { message: string };
  success?: ProfileApiDataSuccess;
}
