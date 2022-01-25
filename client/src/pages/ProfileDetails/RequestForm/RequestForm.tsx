import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Typography, Button, CircularProgress } from '@mui/material';
import FormikDatePicker from '../../../components/FormikDatePicker/FormikDatePicker';
import useStyles from './useStyles';
import { useTheme } from '@mui/system';

export default function RequestForm(): JSX.Element {
  const theme = useTheme();

  const handleSubmit = (
    { startDate, endDate }: { startDate: Date; endDate: Date },
    { setSubmitting }: FormikHelpers<{ startDate: Date; endDate: Date }>,
  ) => {
    setSubmitting(false);
  };

  const classes = useStyles();

  const initialDate = () => {
    return new Date(Date.now());
  };

  return (
    <Formik
      initialValues={{ startDate: initialDate(), endDate: new Date(Date.now() + 3600000) }}
      validationSchema={Yup.object().shape({
        startDate: Yup.date()
          .required('Start date is required')
          .min(initialDate(), 'You must select a date starting from today')
          .test('first', 'Starting date must be sooner than ending date', (date, context) => {
            if (date) {
              return date < context.parent.endDate;
            }
            return false;
          }),
        endDate: Yup.date()
          .required('End date is required')
          .test('second', 'Ending date must be after the start date', (date, context) => {
            if (date) {
              return date > context.parent.startDate;
            }
            return false;
          }),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, setFieldValue, values, handleChange, isSubmitting, errors, touched }) => (
        <form onSubmit={handleSubmit} noValidate className={classes.requestForm}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormikDatePicker
              onChange={handleChange}
              inputId="drop-in"
              label="Drop In"
              date={values.startDate}
              setFieldValue={setFieldValue}
              dateField="startDate"
              error={touched.startDate && Boolean(errors.startDate)}
            />
            <Typography sx={{ marginBottom: 1, marginTop: -1.5, color: theme.palette.error.main }}>
              {errors.startDate}
            </Typography>
            <FormikDatePicker
              inputId="drop-off"
              label="Drop Off"
              date={values.endDate}
              setFieldValue={setFieldValue}
              dateField="endDate"
              error={touched.endDate && Boolean(errors.endDate)}
            />
            <Typography sx={{ marginBottom: 1, marginTop: -1.5, color: theme.palette.error.main }}>
              {errors.endDate}
            </Typography>
          </LocalizationProvider>
          <Button
            sx={{ margin: 'auto', marginTop: 3, height: 60, width: 200 }}
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Send Request'}
          </Button>
        </form>
      )}
    </Formik>
  );
}
