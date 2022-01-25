import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  button: {
    height: 70,
  },
}));
const PaymentSetupForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/profile/settings/payment-methods',
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Box py={4}>
          <Button type="submit" disabled={!stripe} variant="outlined" size="large" className={classes.button}>
            Submit
          </Button>
        </Box>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </Box>
  );
};

export default PaymentSetupForm;
