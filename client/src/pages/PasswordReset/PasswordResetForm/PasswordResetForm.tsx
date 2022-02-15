import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../../components/FormInput/FormInput';

interface Props {
  handleSubmit: (
    { password, confirmPassword }: { password: string; confirmPassword: string },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      password: string;
      confirmPassword: string;
    }>,
  ) => void;
}

export default function PasswordResetForm({ handleSubmit }: Props): JSX.Element {
  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords do not match.')
          .required('Please confirm password'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            id="password"
            label="Password"
            type="password"
            fullWidth
            name="password"
            placeholder="New password"
            autoComplete="password"
            autoFocus
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && Boolean(errors.password) ? <Typography color="error">{errors.password}</Typography> : ''}

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            name="confirmPassword"
            placeholder="Confirm Password"
            helperText={touched.confirmPassword ? errors.confirmPassword : ''}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {touched.confirmPassword && Boolean(errors.confirmPassword) ? (
            <Typography color="error">{errors.confirmPassword}</Typography>
          ) : (
            ''
          )}

          <Box textAlign="center" marginTop={2}>
            <Button type="submit" size="large" variant="contained" color="primary" disableElevation>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Reset Password'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
