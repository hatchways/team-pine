import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from 'react';
import FormikDatePicker from '../../../components/FormikDatePicker/FormikDatePicker';

interface Props {
  handleSubmit: (
    {
      startDate,
      endDate,
    }: {
      startDate: Date;
      endDate: Date;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      startDate: Date;
      endDate: Date;
    }>,
  ) => void;
}

export default function RequestForm({ handleSubmit }: Props): JSX.Element {
  const initialDate = () => {
    return new Date(Date.now());

    // const currentDate = new Date(Date.now());

    // return `${currentDate.getDate()} ${currentDate.getMonth()} ${currentDate.getFullYear()}`;
  };

  return (
    <Formik
      initialValues={{ startDate: new Date(Date.now()), endDate: new Date(Date.now() + 86400000) }}
      validationSchema={Yup.object().shape({
        startDate: Yup.date()
          .required('Start date is required')
          .min(initialDate(), 'You must select a date starting from today')
          .test('first', 'Starting date must be sooner than ending date', function (date) {
            if (date) {
              return date < this.parent.endDate;
            }
          }),
        endDate: Yup.date()
          .required('End date is required')
          .test('second', 'Ending date must be after the start date', function (date) {
            if (date) {
              return date > this.parent.startDate;
            }
            return false;
          }),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, setFieldValue, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormikDatePicker label="Drop In" date={values.startDate} setFieldValue={setFieldValue} field="startDate" />
            <FormikDatePicker label="Drop Off" date={values.endDate} setFieldValue={setFieldValue} field="endDate" />
          </LocalizationProvider>
        </form>
      )}
    </Formik>
  );
}
