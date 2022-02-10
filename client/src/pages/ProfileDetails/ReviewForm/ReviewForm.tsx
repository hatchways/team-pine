import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Box, CircularProgress, Rating, Button, Typography } from '@mui/material';
import { useSnackBar } from '../../../context/useSnackbarContext';
import FormInput from '../../../components/FormInput/FormInput';
import useStyles from './useStyles';
import { useTheme } from '@mui/system';
import createReview from '../../../helpers/APICalls/createReview';
import Review from '../../../interface/Review';

interface Props {
  profileId: string;
  addReview: (review: Review) => void;
}

export default function ReviewForm({ profileId, addReview }: Props): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();
  const theme = useTheme();

  const handleSubmit = (
    { reviewText, rating }: { reviewText: string; rating: number },
    { setSubmitting, resetForm }: FormikHelpers<{ reviewText: string; rating: number }>,
  ) => {
    createReview(profileId, rating, reviewText).then((data) => {
      if (data.error) {
        if (data.error.message == 'Duplicate key found') {
          updateSnackBarMessage('You may only leave one review per profile');
        } else {
          updateSnackBarMessage(data.error.message);
        }
        console.error({ error: data.error.message });
        setSubmitting(false);
      } else if (data.success) {
        updateSnackBarMessage('Review successfully created!');
        const { rating, text, reviewer } = data.success.review;
        addReview({ rating, text, reviewer });
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
    resetForm();
  };

  return (
    <Formik
      initialValues={{ reviewText: '', rating: 0 }}
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
            value={values.rating}
            onChange={(event, newValue) => {
              setFieldValue('rating', newValue);
            }}
            precision={0.5}
          />
          {errors.rating ? (
            <Typography sx={{ color: theme.palette.error.main, marginBottom: theme.spacing(2) }}>
              {errors.rating}
            </Typography>
          ) : (
            <Box sx={{ height: theme.spacing(2) }} />
          )}
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
            sx={{ marginTop: theme.spacing(2) }}
          ></FormInput>
          <Button sx={{ width: 100 }} variant="contained" type="submit">
            {isSubmitting ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Submit'}
          </Button>
        </form>
      )}
    </Formik>
  );
}
