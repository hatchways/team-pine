export interface ProfileDetails {
  name: string;
  description: string;
  aboutMe: string;
  payRate: string;
  location: string;
  photo: string;
}

export interface Profile {
  address?: string;
  birthday?: Date;
  description?: string;
  gender?: string;
  name?: string;
  photo?: string;
  telephone?: string;
  userId: string;
  pay: string;
  _id: string;
}
