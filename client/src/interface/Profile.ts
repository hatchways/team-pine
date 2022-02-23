export interface ProfileDetails {
  name: string;
  description: string;
  aboutMe: string;
  payRate: string;
  location: string;
  photo: string;
}

export interface Profile {
  location?: string;
  birthday?: Date;
  description?: string;
  gender?: string;
  name?: string;
  photo?: string;
  telephone?: string;
  userId: string;
  payRate: string;
  _id: string;
  isSitter?: boolean;
}
