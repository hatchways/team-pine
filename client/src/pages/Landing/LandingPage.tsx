import { FormikHelpers } from 'formik';
import Landing from './LandingForm';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

export default function LandingPage(): JSX.Element {
  const history = useHistory();

  const handleSubmit = (
    { location, dropIn, dropOff }: { location: string; dropIn: Date; dropOff: Date },
    { setSubmitting }: FormikHelpers<{ location: string; dropIn: Date; dropOff: Date }>,
  ) => {
    const dropInDate = moment(dropIn, 'YYYY-MM-DD HH:mm:ss');
    const dropInDay = dropInDate.format('dddd');

    const dropOffDate = moment(dropOff, 'YYYY-MM-DD HH:mm:ss');
    const dropOffDay = dropOffDate.format('dddd');

    console.log(dropInDay, dropOffDay);
    history.push({
      pathname: `/profile/list-profiles/${dropInDay.toLowerCase()}_${dropOffDay.toLowerCase()}/${location}`,
    });
  };

  return <Landing handleSubmit={handleSubmit} />;
}
