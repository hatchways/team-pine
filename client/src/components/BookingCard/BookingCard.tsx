import { Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import { Box } from '@mui/material';
import { Request } from '../../interface/Request';

interface Props {
  booking: Request;
  isNextBooking?: boolean;
}

export default function BookingCard({ booking, isNextBooking }: Props): JSX.Element {
  const date = () => {
    const startTime = booking.startDate.getHours();
    const endTime = booking.endDate.getHours();

    const formattedDate =
      '' +
      booking.startDate.getDate() +
      ' ' +
      booking.startDate.toLocaleString('default', { month: 'long' }) +
      ' ' +
      booking.startDate.getFullYear() +
      ', ' +
      (startTime > 12 ? startTime - 12 : startTime) +
      (startTime >= 12 ? 'PM' : 'AM') +
      ' - ' +
      (endTime > 12 ? endTime - 12 : endTime) +
      (endTime >= 12 ? 'PM' : 'AM');
    return formattedDate;
  };

  // The top line needs to be structured differently depending on if it is in the next-booking box or in the bottom box
  const topLine = () => {
    return isNextBooking ? (
      <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>{date()}</Typography>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>{date()}</Typography>
        <SettingsIcon color="disabled" sx={{ fontSize: '.8rem' }} />
      </Box>
    );
  };

  console.log(booking.user);
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
