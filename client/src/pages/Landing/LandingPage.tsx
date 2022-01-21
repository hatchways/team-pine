import { FormikHelpers } from 'formik';
import getProfiles from '../../helpers/APICalls/getProfiles';
import { useSnackBar } from '../../context/useSnackbarContext';
import Landing from './LandingForm';

export default function LandingPage(): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { location, dropIn, dropOff }: { location: string; dropIn: Date; dropOff: Date },
    { setSubmitting }: FormikHelpers<{ location: string; dropIn: Date; dropOff: Date }>,
  ) => {
    getProfiles(location, dropIn, dropOff).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        // we will handle submit here during integration of profile search
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return <Landing handleSubmit={handleSubmit} />;
}
