import PageContainer from '../../components/PageContainer/PageContainer';
import { Grid, Box, Card, CardContent } from '@mui/material';
import useStyles from './useStyles';
import Calendar from '../../components/Calendar/Calendar';
import BookingCard from '../../components/BookingCard/BookingCard';
import 'react-calendar/dist/Calendar.css';
import { Booking } from '../../interface/Booking';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Bookings(): JSX.Element {
  const classes = useStyles();
  // We expect to receive Date objects from the database for all times and dates, and we will build functions to handle conversion in the BookingCard component.

  // This mock will be replaced with database information once implemented
  const mockBookings: Booking[] = [
    {
      user: {
        name: 'Norma Byers',
        email: 'example@example.com',
      },
      startTime: new Date(Date.parse('2022-01-25T12:00:00.000Z')),
      endTime: new Date(Date.parse('2022-01-25T14:00:00.000Z')),
      status: 'accepted',
    },
    {
      user: {
        name: 'Charles Compton',
        email: 'example@example.com',
      },
      startTime: new Date(Date.parse('2022-01-28T15:00:00.000Z')),
      endTime: new Date(Date.parse('2022-01-28T18:00:00.000Z')),
      status: 'accepted',
    },
    {
      user: {
        name: 'Joan Blakeney',
        email: 'example@example.com',
      },
      startTime: new Date(Date.parse('2022-02-11T08:00:00.000Z')),
      endTime: new Date(Date.parse('2022-02-11T10:00:00.000Z')),
      status: 'declined',
    },
    {
      user: {
        name: 'Michael Carnahan',
        email: 'example@example.com',
      },
      startTime: new Date(Date.parse('2022-01-12T14:00:00.000Z')),
      endTime: new Date(Date.parse('2022-01-12T16:00:00.000Z')),
      status: 'accepted',
    },
  ];

  // return a filtered array AND remove filtered values from the original
  function getPastBookings(bookingsArray: Booking[]) {
    bookingsArray = bookingsArray.filter((value, index, arr) => {
      if (value.startTime < new Date(Date.now())) {
        arr.splice(index, 1);
        return true;
      }
    });
    return bookingsArray;
  }

  function sortBookingDates(bookingsArray: Booking[]) {
    return bookingsArray.sort((booking1, booking2) => {
      if (booking1.startTime < booking2.startTime) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  const pastBookings = getPastBookings(mockBookings);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nextBooking: Booking = mockBookings.shift()!;

  const sortedBookings = sortBookingDates(mockBookings);

  return (
    <PageContainer>
      <Grid justifyContent="center" container spacing={{ md: 5 }}>
        <Grid xs={10} md={4} item>
          <Calendar firstBooking={nextBooking} upcomingBookings={sortedBookings} />
        </Grid>
        <Grid xs={10} md={3} direction="column" item container className={classes.bookings}>
          <Box sx={{ padding: '24px', marginBottom: '16px' }}>
            <div className={classes.bookingSectionLabel}>
              <p>Your next booking:</p>
              <SettingsIcon color="disabled" />
            </div>
            <Card sx={{ boxShadow: 'none' }}>
              <CardContent sx={{ padding: '.1rem 0' }}>
                <BookingCard isNextBooking booking={nextBooking} />
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ padding: '24px' }}>
            <p>Current bookings:</p>
            {sortedBookings.map((booking, i) => {
              return (
                <Card className={classes.bookingCard} key={i} variant="outlined">
                  <CardContent className={classes.bookingCardContent}>
                    <BookingCard booking={booking} />
                  </CardContent>
                </Card>
              );
            })}
            <br />
            <p>Past bookings:</p>
            {pastBookings.map((booking, i) => {
              return (
                <Card className={classes.bookingCard} key={i} variant="outlined">
                  <CardContent className={classes.bookingCardContent}>
                    <BookingCard booking={booking} />
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
