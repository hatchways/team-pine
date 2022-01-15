import { Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import { Box } from '@mui/material';
import { Booking } from '../../interface/Booking';

interface Props {
  booking: Booking;
  isNextBooking?: boolean;
}

export default function BookingCard({ booking, isNextBooking }: Props): JSX.Element {
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

  // The top line needs to be structured differently depending on if it is in the next-booking box or in the bottom box
  const topLine = () => {
    if (isNextBooking) {
      return <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>{date()}</Typography>;
    } else {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>{date()}</Typography>
          <SettingsIcon color="disabled" sx={{ fontSize: '.8rem' }} />
        </Box>
      );
    }
  };

  return (
    <>
      {topLine()}
      <Box sx={{ padding: '0', display: 'flex', alignItems: 'center', marginBottom: 0 }}>
        <AvatarDisplay loggedIn={false} user={booking.user} />
        <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>{booking.user.name}</Typography>
        {!isNextBooking ? (
          <Typography
            sx={{
              alignSelf: 'flex-start',
              marginLeft: 'auto',
              marginRight: '1rem',
              color: 'rgba(0,0,0,0.26)',
              fontSize: '.6rem',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
            }}
          >
            {booking.status}
          </Typography>
        ) : (
          ''
        )}
      </Box>
    </>
  );
}
