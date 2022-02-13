import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../../components/FormInput/FormInput';

interface Props {
  handleSubmit: (
    { email }: { email: string },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
    }>,
  ) => void;
}

export default function SendPasswordResetForm({ handleSubmit }: Props): JSX.Element {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is not valid'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            id="email"
            label="Email Address"
            fullWidth
            margin="normal"
            name="email"
            placeholder="Your email"
            autoComplete="email"
            autoFocus
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
          />
          {touched.email && Boolean(errors.email) ? <Typography color="error">{errors.email}</Typography> : ''}

          <Box textAlign="center" marginTop={2}>
            <Button type="submit" size="large" variant="contained" color="primary" disableElevation>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Send Email'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
