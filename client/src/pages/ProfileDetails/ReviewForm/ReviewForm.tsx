import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { CircularProgress, Rating, Button } from '@mui/material';
import { useSnackBar } from '../../../context/useSnackbarContext';
import FormInput from '../../../components/FormInput/FormInput';
import useStyles from './useStyles';
import { useTheme } from '@mui/system';

export default function ReviewForm({ profileId }: { profileId: string }): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();
  const theme = useTheme();

  const handleSubmit = (
    { reviewText, rating }: { reviewText: string; rating: number },
    { setSubmitting }: FormikHelpers<{ reviewText: string; rating: number }>,
  ) => {
    console.log(reviewText, rating);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ reviewText: '', rating: 3 }}
      validationSchema={Yup.object().shape({
        rating: Yup.number()
          .required('You must select a rating')
          .min(1, 'Rating must be between 1 and 5')
          .max(5, 'Rating must be between 1 and 5'),
        reviewText: Yup.string().max(2000, 'Comments must be 2000 characters or less'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, setFieldValue, values, handleChange, isSubmitting, errors, touched }) => (
        <form className={classes.reviewForm} onSubmit={handleSubmit} noValidate>
          <Rating
            sx={{ marginBottom: theme.spacing(2) }}
            value={values.rating}
            onChange={(event, newValue) => {
              setFieldValue('rating', newValue);
            }}
          />
          <FormInput
            id="review-comments"
            label="Optional Comments"
            fullWidth
            name="reviewText"
            helpertext={touched.reviewText ? errors.reviewText : ''}
            error={touched.reviewText && Boolean(errors.reviewText)}
            value={values.reviewText}
            onChange={handleChange}
            multiline
            minRows={3}
          ></FormInput>
          <Button sx={{ width: 100 }} variant="contained" type="submit">
            {isSubmitting ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Submit'}
          </Button>
        </form>
      )}
    </Formik>
  );
}
