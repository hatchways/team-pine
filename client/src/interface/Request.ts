import { User } from './User';

export interface Request {
  startDate: Date;
  endDate: Date;
  status: string;
  user: User;
}
