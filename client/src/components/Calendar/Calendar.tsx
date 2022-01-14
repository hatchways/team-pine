import { default as ReactCalendar } from 'react-calendar';
import useStyles from './useStyles';

export default function Calendar(): JSX.Element {
  const classes = useStyles();

  return <ReactCalendar className={classes.calendar} />;
}
