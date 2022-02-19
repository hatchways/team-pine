import { ReactElement, useState } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import useStyles from './useStyles';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import login from '../../../helpers/APICalls/login';

interface User {
  email: string;
  password: string;
}

const testUser: User = {
  email: 'testuser@gmail.com',
  password: 'testpassword',
};

export default function DemoLoginButton(): ReactElement {
  const classes = useStyles();

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (email: string, password: string) => {
    setSubmitting(true);
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Box textAlign="center" marginTop={5}>
      <Button
        type="submit"
        size="large"
        variant="contained"
        color="primary"
        className={classes.submit}
        disableElevation
        onClick={() => handleSubmit(testUser.email, testUser.password)}
      >
        {isSubmitting ? <CircularProgress color="inherit" /> : 'Demo Login'}
      </Button>
    </Box>
  );
}
