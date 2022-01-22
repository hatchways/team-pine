import { User } from './User';

export interface Booking {
  startTime: Date;
  endTime: Date;
  status: string;
  user: User;
}
