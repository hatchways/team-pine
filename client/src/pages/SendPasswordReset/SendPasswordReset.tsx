import { Typography } from '@mui/material';
import { FormikHelpers } from 'formik';
import AuthPageWrapper from '../../components/AuthPageWrapper/AuthPageWrapper';
import PageContainer from '../../components/PageContainer/PageContainer';
import PasswordResetForm from './SendPasswordResetForm/SendPasswordResetForm';
import sendPasswordResetEmail from '../../helpers/APICalls/sendPasswordResetEmail';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function SendPasswordReset(): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = ({ email }: { email: string }, { setSubmitting }: FormikHelpers<{ email: string }>) => {
    sendPasswordResetEmail(email).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateSnackBarMessage(data.success.message);
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
        <Typography sx={{ fontWeight: 700, marginBottom: 3 }}>
          Please enter the email for your account. A link to reset your password will be sent to you.
        </Typography>
        <PasswordResetForm handleSubmit={handleSubmit} />
      </AuthPageWrapper>
    </PageContainer>
  );
}
