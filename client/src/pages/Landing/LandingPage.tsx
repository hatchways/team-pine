import { FormikHelpers } from 'formik';
import getProfiles from '../../helpers/APICalls/getProfiles';
import { useSnackBar } from '../../context/useSnackbarContext';
import PageContainer from '../../components/PageContainer/PageContainer';
import Landing from './LandingForm';

export default function Login(): JSX.Element {
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
        // updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <PageContainer>
      <Landing handleSubmit={handleSubmit} />
    </PageContainer>
  );
}
