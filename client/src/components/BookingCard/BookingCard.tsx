import { Typography } from '@mui/material';
import RequestStatusButton from '../RequestStatusButton/RequestStatusButton';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import { Box } from '@mui/material';
import { Request } from '../../interface/Request';
import { useState } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';
import changeRequestStatus from '../../helpers/APICalls/changeRequestStatus';
import clsx from 'clsx';

interface Props {
  booking: Request;
  isNextBooking?: boolean;
  isPastBooking?: boolean;
}

export default function BookingCard({ booking, isNextBooking, isPastBooking }: Props): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const [status, setStatus] = useState<string>(booking.status);

  const date = () => {
    const startTime = booking.startDate.getHours();
    const endTime = booking.endDate.getHours();

    const formattedDate = `${booking.startDate.getDate()} ${booking.startDate.toLocaleString('default', {
      month: 'long',
    })} ${booking.startDate.getFullYear()}, ${startTime > 12 ? startTime - 12 : startTime} ${
      startTime >= 12 ? 'PM' : 'AM'
    } - ${endTime > 12 ? endTime - 12 : endTime} ${endTime >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    booking.status = newStatus;
    changeRequestStatus(booking.id, newStatus).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateSnackBarMessage('Status successfully changed');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
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
        <AvatarDisplay photoUrl={booking.photo} loggedIn={false} name={booking.user.name} />
        <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>&nbsp;{booking.user.name}</Typography>
        <Typography
          sx={{
            alignSelf: 'flex-start',
            marginLeft: 'auto',
            marginRight: '1rem',
            color: clsx({ 'rgb(0,0,0)': status == 'accepted' }, { 'rgba(0,0,0,0.26)': status != 'accepted' }),
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
