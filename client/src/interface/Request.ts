import { User } from './User';

export interface Request {
  startTime: Date;
  endTime: Date;
  status: string;
  user: User;
}
