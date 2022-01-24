import PageContainer from '../../components/PageContainer/PageContainer';
import { Grid, Box, Card, CardContent, Typography } from '@mui/material';
import useStyles from './useStyles';
import Calendar from '../../components/Calendar/Calendar';
import BookingCard from '../../components/BookingCard/BookingCard';
import 'react-calendar/dist/Calendar.css';
import { Request } from '../../interface/Request';
import getRequests from '../../helpers/APICalls/getRequests';
import { useState, useEffect } from 'react';

const boxShadow =
  '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)';

export default function Bookings(): JSX.Element {
  const classes = useStyles();

  const [mounted, setMounted] = useState(false);
  const [pastBookings, setPastBookings] = useState<Request[] | undefined>();
  const [nextBooking, setNextBooking] = useState<Request | undefined>();
  const [sortedBookings, setSortedBookings] = useState<Request[] | undefined>();

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      getRequests().then((res) => {
        if (!res.error) {
          const userBookings: Request[] = [];
          for (let i = 0; i < res.requests.length; i++) {
            userBookings.push({
              startDate: new Date(res.requests[i].startDate),
              endDate: new Date(res.requests[i].endDate),
              id: res.requests[i]._id,
              status: res.requests[i].status,
              user: {
                name: res.requests[i].requester.name,
                email: res.requests[i].requester.email,
              },
            });
          }
          if (userBookings.length > 0 && userBookings != undefined) {
            setPastBookings(getPastBookings(userBookings));
            setNextBooking(userBookings.shift());
            setSortedBookings(sortBookingDates(userBookings));
          }
        }
      });
    }
  }, [mounted, nextBooking, pastBookings, sortedBookings]);

  function getPastBookings(bookingsArray: Request[]) {
    bookingsArray = bookingsArray.filter((value, index, arr) => {
      if (value.startDate < new Date(Date.now())) {
        arr.splice(index, 1);
        return true;
      }
    });
    return bookingsArray;
  }

  function sortBookingDates(bookingsArray: Request[]) {
    return bookingsArray.sort((booking1, booking2) => {
      if (booking1.startDate < booking2.startDate) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  return (
    <PageContainer>
      <Grid justifyContent="center" container spacing={{ md: 5 }}>
        <Grid xs={10} md={4} item>
          <Calendar firstBooking={nextBooking} upcomingBookings={sortedBookings} />
        </Grid>
        <Grid xs={10} md={3} direction="column" item container className={classes.bookings}>
          <Box sx={{ padding: '18px 24px 24px 24px', marginBottom: '16px', boxShadow: boxShadow }}>
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
          {(pastBookings && pastBookings.length > 0) || (sortedBookings && sortedBookings.length > 0) ? (
            <Box sx={{ padding: '24px', boxShadow: boxShadow }}>
              {sortedBookings && sortedBookings.length > 0 ? (
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
              {pastBookings && pastBookings.length > 0 ? (
                <>
                  {' '}
                  <Typography sx={{ fontSize: '.7rem', fontWeight: 'bold' }}>Past bookings:</Typography>
                  {pastBookings.map((booking, i) => {
                    return (
                      <Card className={classes.bookingCard} key={i} variant="outlined">
                        <CardContent className={classes.bookingCardContent}>
                          <BookingCard isPastBooking booking={booking} />
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
