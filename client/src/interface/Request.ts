import { User } from './User';

export interface Request {
  id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  user: User;
  photo: string;
}
