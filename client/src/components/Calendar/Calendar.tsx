import { isSameDay } from 'date-fns';
import { default as ReactCalendar } from 'react-calendar';
import { Booking } from '../../interface/Booking';
import useStyles from './useStyles';

interface Props {
  firstBooking?: Booking;
  upcomingBookings?: Booking[];
}

export default function Calendar({ firstBooking, upcomingBookings }: Props): JSX.Element {
  const classes = useStyles();

  function tileClassName({ date, view }: { date: Date; view: string }) {
    if (view === 'month') {
      // Check if the date matches either the first booking or any of the upcoming bookings (not declined), then return the class we want
      if (firstBooking) {
        if (isSameDay(date, firstBooking.startTime)) {
          return classes.activeTile;
        }
        if (upcomingBookings) {
          for (const booking of upcomingBookings) {
            if (isSameDay(booking.startTime, date) && booking.status != 'declined') {
              return classes.activeTile;
            }
          }
        }
      }
    }
    return 'yes';
  }

  return <ReactCalendar className={classes.calendar} tileClassName={tileClassName} />;
}
