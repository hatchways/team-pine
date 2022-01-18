import PageContainer from '../../components/PageContainer/PageContainer';
import { Grid, Box, Card, CardContent, Typography } from '@mui/material';
import useStyles from './useStyles';
import Calendar from '../../components/Calendar/Calendar';
import BookingCard from '../../components/BookingCard/BookingCard';
import 'react-calendar/dist/Calendar.css';
import { Request } from '../../interface/Request';
import SettingsIcon from '@mui/icons-material/Settings';
import getRequests from '../../helpers/APICalls/getRequests';

const boxShadow =
  '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)';

export default function Bookings(): JSX.Element {
  const classes = useStyles();
  // We expect to receive Date objects from the database for all times and dates, and we will build functions to handle conversion in the BookingCard component.

  const userBookings: Request[] = [];
  getRequests('sitter').then((res) => {
    if (res) {
      for (let i = 0; i < res.requests.length; i++) {
        userBookings[i] = res.requests[i];
      }
      console.log(userBookings);
    }
  });

  function getPastBookings(bookingsArray: Request[]) {
    bookingsArray = bookingsArray.filter((value, index, arr) => {
      if (value.startTime < new Date(Date.now())) {
        arr.splice(index, 1);
        return true;
      }
    });
    return bookingsArray;
  }

  function sortBookingDates(bookingsArray: Request[]) {
    return bookingsArray.sort((booking1, booking2) => {
      if (booking1.startTime < booking2.startTime) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  const pastBookings = getPastBookings(userBookings);

  const nextBooking = userBookings.shift();

  const sortedBookings = sortBookingDates(userBookings);

  console.log(pastBookings, nextBooking, sortedBookings);

  return (
    <PageContainer>
      <Grid justifyContent="center" container spacing={{ md: 5 }}>
        <Grid xs={10} md={4} item>
          <Calendar firstBooking={nextBooking} upcomingBookings={sortedBookings} />
        </Grid>
        <Grid xs={10} md={3} direction="column" item container className={classes.bookings}>
          <Box sx={{ padding: '24px', marginBottom: '16px', boxShadow: boxShadow }}>
            <Box className={classes.bookingSectionLabel}>
              <Typography sx={{ fontSize: '.7rem', fontWeight: 'bold' }}>Your next booking:</Typography>
              <SettingsIcon color="disabled" />
            </Box>
            <Card sx={{ boxShadow: 'none' }}>
              <CardContent sx={{ padding: '.1rem 0' }}>
                {nextBooking ? (
                  <BookingCard isNextBooking booking={nextBooking} />
                ) : (
                  <Typography sx={{ fontSize: '.7rem', textTransform: 'none' }}>
                    You have no upcoming bookings.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
          {pastBookings.length > 0 || sortedBookings.length > 0 ? (
            <Box sx={{ padding: '24px', boxShadow: boxShadow }}>
              {sortedBookings.length > 0 ? (
                <>
                  <Typography sx={{ fontSize: '.7rem', fontWeight: 'bold' }}>Current bookings:</Typography>
                  {sortedBookings.map((booking, i) => {
                    return (
                      <Card className={classes.bookingCard} key={i} variant="outlined">
                        <CardContent className={classes.bookingCardContent}>
                          <BookingCard booking={booking} />
                        </CardContent>
                      </Card>
                    );
                  })}
                </>
              ) : (
                ''
              )}
              <br />
              {pastBookings.length > 0 ? (
                <>
                  {' '}
                  <Typography sx={{ fontSize: '.7rem', fontWeight: 'bold' }}>Past bookings:</Typography>
                  {pastBookings.map((booking, i) => {
                    return (
                      <Card className={classes.bookingCard} key={i} variant="outlined">
                        <CardContent className={classes.bookingCardContent}>
                          <BookingCard booking={booking} />
                        </CardContent>
                      </Card>
                    );
                  })}
                </>
              ) : (
                ''
              )}
            </Box>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
}