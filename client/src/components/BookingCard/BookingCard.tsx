import { Typography } from '@mui/material';
import RequestStatusButton from '../RequestStatusButton/RequestStatusButton';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import { Box } from '@mui/material';
import { Request } from '../../interface/Request';
import { useState } from 'react';
import changeRequestStatus from '../../helpers/APICalls/changeRequestStatus';

interface Props {
  booking: Request;
  isNextBooking?: boolean;
  isPastBooking?: boolean;
}

export default function BookingCard({ booking, isNextBooking, isPastBooking }: Props): JSX.Element {
  const [status, setStatus] = useState<string>(booking.status);

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

  const statusColor = () => {
    if (status == 'accepted') {
      return 'rgb(0,0,0)';
    } else {
      return 'rgba(0,0,0,0.26)';
    }
  };

  const handleStatusChange = (status: string) => {
    setStatus(status);
    booking.status = status;
    changeRequestStatus(booking.id, status);
  };

  // The top line needs to be structured differently depending on if it is in the next-booking box or in the bottom box
  const topLine = () => {
    return isNextBooking ? (
      <>
        {' '}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: '.7rem', fontWeight: 'bold' }}>Your next booking:</Typography>
          <RequestStatusButton onStatusChange={handleStatusChange} booking={booking} />
        </Box>
        <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>{date()}</Typography>
      </>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ textTransform: 'none', fontWeight: 'bold', marginLeft: '.5rem' }}>{date()}</Typography>
        {!isPastBooking ? (
          <RequestStatusButton onStatusChange={handleStatusChange} booking={booking} fontSize=".8rem" />
        ) : (
          ''
        )}
      </Box>
    );
  };

  return (
    <>
      {topLine()}
      <Box sx={{ padding: '0', display: 'flex', alignItems: 'center', marginBottom: 0 }}>
        <AvatarDisplay loggedIn={false} user={booking.user} />
        <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>{booking.user.name}</Typography>
        <Typography
          sx={{
            alignSelf: 'flex-start',
            marginLeft: 'auto',
            marginRight: '1rem',
            color: statusColor(),
            fontSize: '.6rem',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          }}
        >
          {status}
        </Typography>
      </Box>
    </>
  );
}
