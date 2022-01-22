import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik, FormikHelpers } from 'formik';
import useStyles from './useStyles';

interface Props {
  handleSubmit: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => void;
}

export default function DemoLogin({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: 'testuser@gmail.com',
        password: 'testpassword',
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Box textAlign="center" marginTop={5}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
              disableElevation
            >
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Demo Login'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
