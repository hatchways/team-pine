import { Typography } from '@mui/material';
import { FormikHelpers } from 'formik';
import AuthPageWrapper from '../../components/AuthPageWrapper/AuthPageWrapper';
import PageContainer from '../../components/PageContainer/PageContainer';
import PasswordResetForm from './PasswordResetForm/PasswordResetForm';
import resetPassword from '../../helpers/APICalls/resetPassword';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useParams, useHistory } from 'react-router-dom';

export default function SendPasswordReset(): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const { email, token } = useParams<{ email: string; token: string }>();
  const history = useHistory();

  const handleSubmit = (
    { password, confirmPassword }: { password: string; confirmPassword: string },
    { setSubmitting }: FormikHelpers<{ password: string; confirmPassword: string }>,
  ) => {
    resetPassword(password, email, token).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateSnackBarMessage(data.success.message);
        history.push('/login');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
    setSubmitting(false);
  };

  return (
    <PageContainer>
      <AuthPageWrapper header="">
        <Typography sx={{ fontWeight: 700, marginBottom: 3 }}>Please enter your new password.</Typography>
        <PasswordResetForm handleSubmit={handleSubmit} />
      </AuthPageWrapper>
    </PageContainer>
  );
}
