import { Grid, Box, Button, Typography, Rating, Divider, List } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import ProfileReview from '../../components/ProfileReview/ProfileReview';
import ReviewsDialog from '../../components/ReviewsDialog/ReviewsDialog';
import ReviewForm from './ReviewForm/ReviewForm';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RequestForm from './RequestForm/RequestForm';
import useStyles from './useStyles';
import { useState, useEffect } from 'react';
import getProfile from '../../helpers/APICalls/getProfile';
import getReviews from '../../helpers/APICalls/getReviews';
import { ProfileDetails as Profile } from '../../interface/Profile';
import { useParams } from 'react-router-dom';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useTheme } from '@mui/material';
import Review from '../../interface/Review';

const mockPhotos = [
  'https://images.pexels.com/photos/3714060/pexels-photo-3714060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/6303371/pexels-photo-6303371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

export default function ProfileDetails(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

  const { updateSnackBarMessage } = useSnackBar();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | undefined>();
  const [reviews, setReviews] = useState<Review[] | undefined>();
  const [rating, setRating] = useState<number>(2.5);
  const [reviewsDialogOpen, setReviewsDialogOpen] = useState<boolean>(false);

  const { profileId } = useParams<{ profileId: string }>();

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      getProfile(profileId).then((res) => {
        if (!res.error) {
          setProfile(res.success.profile);
          getReviews(profileId).then((res) => {
            if (!res.error) {
              setReviews(res.success.reviews);
              setRating(res.success.rating);
            } else {
              console.error(res.error);
              updateSnackBarMessage('Reviews not found');
            }
          });
        } else {
          console.error(res.error);
          updateSnackBarMessage('Profile not found');
        }
      });
    }
  }, [isMounted, profileId, updateSnackBarMessage]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  });

  const handleClickOpen = () => {
    setReviewsDialogOpen(true);
  };

  const handleClose = () => {
    setReviewsDialogOpen(false);
  };

  const addReview = (review: Review) => {
    if (reviews) {
      setReviews([review, ...reviews]);
    } else {
      setReviews([review]);
    }
  };

  return (
    <PageContainer>
      <Grid
        maxWidth={windowWidth < 600 ? 400 : windowWidth < 1200 ? 600 : 1200}
        m={'auto'}
        justifyContent="space-around"
        container
        alignItems="flex-start"
      >
        <Grid
          mb={windowWidth < 1200 ? 3 : 0}
          xs={12}
          lg={6}
          item
          borderRadius={2}
          boxShadow={windowWidth < 1200 ? 0 : 4}
          container
          flexDirection="column"
        >
          {profile ? (
            <>
              <Box borderRadius={2} className={classes.coverImage}>
                <AvatarDisplay
                  width={window.innerWidth < 600 ? 100 : 150}
                  height={window.innerWidth < 600 ? 100 : 150}
                  loggedIn
                  user={{ name: profile.name, email: 'example@example.com' }}
                  photoUrl={profile.photo}
                />
              </Box>
              <Box m={windowWidth < 600 ? '1rem 0' : '5rem 0 1rem 0'} textAlign="center">
                <Typography fontWeight="bold" component="h1" fontSize="1.4rem">
                  {profile.name}
                </Typography>
                <Typography fontWeight="bold" color="rgba(0,0,0,0.3)">
                  {profile.description}
                </Typography>
              </Box>
              <Typography
                margin="auto"
                mb={4}
                display="flex"
                alignItems="center"
                color="rgba(0,0,0,0.3)"
                fontWeight="bold"
                sx={{ textTransform: 'capitalize' }}
              >
                <LocationOnIcon color="primary" /> &nbsp; {profile.location}
              </Typography>
              {profile.aboutMe != '' ? (
                <Box m={windowWidth < 600 ? `${5} ${4}` : 5}>
                  <Typography mb={1} component="h2" fontSize="1.1rem" fontWeight="bold">
                    About me
                  </Typography>
                  <Typography mb={4}>{profile.aboutMe}</Typography>
                  {mockPhotos.map((item) => (
                    <img key={item} className={classes.listImage} src={item} alt="Pet image" />
                  ))}
                </Box>
              ) : null}
            </>
          ) : (
            'No Profile Found'
          )}
        </Grid>
        {windowWidth < 1200 ? <Divider sx={{ width: '100%' }} /> : null}
        {profile ? (
          <Grid
            padding={theme.spacing(2)}
            xs={12}
            lg={4}
            item
            borderRadius={2}
            boxShadow={windowWidth < 1200 ? 'none' : 4}
            container
            flexDirection="column"
          >
            <Typography component="p" fontSize="1.1rem" fontWeight="bold" m="3rem auto 1rem auto">
              ${profile.payRate}/hr
            </Typography>
            <Rating sx={{ margin: 'auto' }} value={rating} precision={0.5} readOnly />
            <RequestForm profileId={profileId} />
            <Divider sx={{ width: '95%', margin: 'auto' }} />
            <Box className={classes.reviewsContainer}>
              <Typography component="h2" fontSize="1.1rem">
                Reviews {reviews && reviews.length > 0 ? `(${reviews.length})` : null}
              </Typography>
              <List>
                {reviews && reviews.length > 0 ? (
                  reviews.slice(0, 3).map((review, i) => {
                    return (
                      <Box key={i} className={classes.review}>
                        <ProfileReview review={review} />
                      </Box>
                    );
                  })
                ) : (
                  <Typography>This user has no reviews</Typography>
                )}
              </List>
              {reviews && reviews.length > 3 ? (
                <>
                  <Button onClick={handleClickOpen} sx={{ alignSelf: 'flex-end' }}>
                    <Typography>See all reviews</Typography>
                  </Button>
                  <ReviewsDialog
                    reviews={reviews}
                    profileName={profile.name}
                    open={reviewsDialogOpen}
                    onClose={handleClose}
                  />
                </>
              ) : null}
              <Divider sx={{ width: '100%' }} />
              <Box className={classes.reviewForm}>
                <Typography component="h2" fontSize="1.1rem">
                  Leave a review
                </Typography>
                <ReviewForm profileId={profileId} addReview={addReview} />
              </Box>
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </PageContainer>
  );
}
