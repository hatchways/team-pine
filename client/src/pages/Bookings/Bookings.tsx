import PageContainer from '../../components/PageContainer/PageContainer';
import { Grid, Box } from '@mui/material';
import useStyles from './useStyles';
import Calendar from '../../components/Calendar/Calendar';
import 'react-calendar/dist/Calendar.css';

export default function Bookings(): JSX.Element {
  const classes = useStyles();

  return (
    <PageContainer>
      <Grid container classes={{ root: classes.root }} spacing={{ md: 5 }}>
        <Grid xs={10} md={4} item>
          <Calendar />
        </Grid>
        <Grid xs={10} md={3} direction="column" item container className={classes.upcomingBookings}>
          <Box>Your next booking:</Box>
          <Box>Current bookings:</Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
