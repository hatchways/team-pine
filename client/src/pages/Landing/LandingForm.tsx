import React, { ReactElement, useState } from 'react';
import { Grid, Button, Box, CircularProgress, Typography, TextField, InputLabel, Container } from '@mui/material';
import dogs from '../../images/landing/dogs.jpg';
import useStyles from './useStyles';
import FormInput from '../../components/FormInput/FormInput';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface Props {
  handleSubmit: (
    {
      location,
      dropIn,
      dropOff,
    }: {
      location: string;
      dropIn: Date;
      dropOff: Date;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      location: string;
      dropIn: Date;
      dropOff: Date;
    }>,
  ) => void;
}

export default function LandingForm({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={6}>
        <Container>
          <Typography className={classes.header} variant="h2" component={'h1'}>
            Find the care your <br />
            dog deserves
          </Typography>
          <Formik
            initialValues={{
              location: '',
              dropIn: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
              dropOff: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            }}
            validationSchema={Yup.object().shape({
              location: Yup.string().required('Location is required'),
              dropIn: Yup.date().required('Drop in date is required'),
              dropOff: Yup.date().required('Drop off date is required'),
            })}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <FormInput
                  id="location"
                  label="Where"
                  fullWidth
                  margin="normal"
                  name="location"
                  placeholder="Where?"
                  autoComplete="location"
                  autoFocus
                  helperText={touched.location ? errors.location : ''}
                  error={touched.location && Boolean(errors.location)}
                  value={values.location}
                  onChange={handleChange}
                />

                <Grid container>
                  <Grid item xs={6}>
                    <FormInput
                      id="dropIn"
                      label="Drop In"
                      fullWidth
                      margin="normal"
                      type="date"
                      name="dropIn"
                      placeholder={'Your password'}
                      autoComplete="dropIn"
                      helperText={touched.dropIn ? errors.dropIn : ''}
                      error={touched.dropIn && Boolean(errors.dropIn)}
                      value={values.dropIn}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormInput
                      id="dropOff"
                      label="Drop Off"
                      fullWidth
                      margin="normal"
                      type="date"
                      name="dropOff"
                      placeholder="Your password"
                      autoComplete="dropOff"
                      helperText={touched.dropOff ? errors.dropOff : ''}
                      error={touched.dropOff && Boolean(errors.dropOff)}
                      value={values.dropOff}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Box marginTop={5}>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disableElevation
                  >
                    {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Find my dog sitter'}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Grid>
      <Grid item xs={6}>
        <img className={classes.dogImage} src={dogs} />
      </Grid>
    </Grid>
  );
}
