import PageContainer from '../../components/PageContainer/PageContainer';
import { Grid, Box, Card, CardContent } from '@mui/material';
import useStyles from './useStyles';
import Calendar from '../../components/Calendar/Calendar';
import BookingCard from '../../components/BookingCard/BookingCard';
import 'react-calendar/dist/Calendar.css';
import { Booking } from '../../interface/Booking';

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

  // We need to get past bookings out of the bookings array into its own variable
  const pastBookings = getPastBookings(mockBookings);

  // This is where we will pass in the real bookings when we have them
  const sortedBookings = sortBookingDates(mockBookings);

  return (
    <PageContainer>
      <Grid justifyContent="center" container spacing={{ md: 5 }}>
        <Grid xs={10} md={4} item>
          <Calendar />
        </Grid>
        <Grid xs={10} md={3} direction="column" item container className={classes.bookings}>
          <Box>
            Your next booking:
            <Card sx={{ boxShadow: 'none' }}>
              <CardContent sx={{ padding: 0 }}>
                <BookingCard booking={sortedBookings[0]} />
              </CardContent>
            </Card>
          </Box>
          <Box>
            Current bookings:
            <br />
            Past bookings:
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
