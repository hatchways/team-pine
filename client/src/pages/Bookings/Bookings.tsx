import PageContainer from '../../components/PageContainer/PageContainer';
import { Grid, Box } from '@mui/material';
import useStyles from './useStyles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Bookings(): JSX.Element {
  const classes = useStyles();

  return (
    <PageContainer>
      <Grid container classes={{ root: classes.root }}>
        <Grid xs={10} md={4} item>
          <Calendar className={classes.calendar} />
        </Grid>
        <Grid xs={10} md={4} direction="column" container className={classes.upcomingBookings}>
          <Box>Your next booking</Box>
          <Box>Other bookings</Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
