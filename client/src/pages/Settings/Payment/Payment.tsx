import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { fetchClientSecret, fetchSavedCards, PaymentMethod } from '../../../helpers/APICalls/payment';
import { useSnackBar } from '../../../context/useSnackbarContext';

import { makeStyles } from '@mui/styles';
import { Box, Button, Typography } from '@mui/material';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';

import PaymentCard from '../../../components/PaymentCard/PaymentCard';
import PaymentSetupForm from '../../../components/PaymentSetup/PaymentSetupForm';
import { CircularProgress } from '@mui/material';

const stripePromise = loadStripe(
  'pk_test_51KKJPUHik32C4EVUqXN1YLxBPjMbWS01IaIRIUAnR2bKEz730V4UY0bGo89Vgd4WjF95XqFIbf7qHUFuRBmXn6Z700WymMSUcv',
);
const useStyles = makeStyles({
  root: {
    '& .MuiButton-root': {
      textTransform: 'none',
    },
  },
  button: {
    height: 70,
  },
});
interface PaymentProps {
  header: string;
}
const Payment: React.FC<PaymentProps> = ({ header }) => {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<Array<PaymentMethod>>();
  const [isAddCard, setIsAddCard] = useState<boolean>(false);

  const options = {
    clientSecret,
    appearance: {},
  };
  useEffect(() => {
    fetchSavedCards()
      .then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          setPaymentMethods(data.success.payment_methods);
        }
      })
      .catch((err) => {
        updateSnackBarMessage(err);
      });

    fetchClientSecret()
      .then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          setClientSecret(data.success?.client_secret || '');
        }
      })
      .catch((err) => {
        updateSnackBarMessage(err);
      });
  }, [updateSnackBarMessage]);
  if (clientSecret === '') {
    return <CircularProgress />;
  }

  const addNewPaymentProfileHandler = () => {
    setIsAddCard(true);
  };
  const cancleAddPaymentProfileHandler = () => {
    setIsAddCard(false);
  };

  return (
    <Box
      sx={{
        margin: '0 auto',
      }}
      minHeight="70vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
    >
      <SettingHeader header={header} />
      <Box height="70vh" className={classes.root}>
        {isAddCard ? (
          <Elements stripe={stripePromise} options={options}>
            <PaymentSetupForm />
            <Button variant="outlined" size="large" onClick={cancleAddPaymentProfileHandler} className={classes.button}>
              Go Back
            </Button>
          </Elements>
        ) : (
          <Box>
            <Typography fontSize={18} fontWeight="light">
              Saved Payment Profiles:
            </Typography>
            <Box mt={5} display="flex" justifyContent="flext-start" width="100%" flexWrap="wrap">
              {paymentMethods?.map((method, index) => {
                return (
                  <PaymentCard
                    key={method?.id}
                    isDefault={index === 0}
                    brand={method?.card.brand}
                    last4={method?.card?.last4}
                    expireMonth={method?.card?.exp_month}
                    expireYear={method?.card?.exp_year}
                    cardHolderName={method?.card?.name}
                  />
                );
              })}
            </Box>
            <Box py={4}>
              <Button variant="outlined" size="large" onClick={addNewPaymentProfileHandler} className={classes.button}>
                Add new payment profile
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Payment;
