import { Typography } from '@mui/material';
import { User } from '../../interface/User';

interface Props {
  booking: {
    user: User;
    startTime: Date;
    endTime: Date;
    status?: string;
  };
}

export default function BookingCard({ booking }: Props): JSX.Element {
  const date = () => {
    return (
      '' +
      booking.startTime.getDate() +
      ' ' +
      booking.startTime.toLocaleString('default', { month: 'long' }) +
      ' ' +
      booking.startTime.getFullYear() +
      ', ' +
      booking.startTime.getHours() +
      '-' +
      booking.endTime.getHours() +
      ' ' +
      (booking.endTime.getHours() >= 12 ? ' PM' : ' AM')
    );
  };

  return (
    <>
      <Typography sx={{ textTransform: 'none' }}>{date()}</Typography>
      <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>{booking.user.name}</Typography>
    </>
  );
}
