import { Grid, Box, Typography, Rating, Divider } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RequestForm from './RequestForm/RequestForm';
import useStyles from './useStyles';
import { useState, useEffect } from 'react';
import getProfile from '../../helpers/APICalls/getProfile';
import { ProfileDetails as Profile } from '../../interface/Profile';
import { useParams } from 'react-router-dom';

const mockPhotos = [
  'https://images.pexels.com/photos/3714060/pexels-photo-3714060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/6303371/pexels-photo-6303371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

export default function ProfileDetails(): JSX.Element {
  const classes = useStyles();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | undefined>();

  const { profileId } = useParams<{ profileId: string }>();

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      getProfile(profileId).then((res) => {
        if (!res.error) {
          setProfile(res.success.profile);
        }
      });
    }
  }, [isMounted, profileId]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  });

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
          <Box borderRadius={2} className={classes.coverImage}>
            {profile ? (
              <AvatarDisplay
                width={window.innerWidth < 600 ? 100 : 150}
                height={window.innerWidth < 600 ? 100 : 150}
                loggedIn
                user={{ name: profile.name, email: 'example@example.com' }}
                photoUrl={profile ? profile.photo : ''}
              />
            ) : null}
          </Box>
          <Box m={windowWidth < 600 ? '1rem 0' : '5rem 0 1rem 0'} textAlign="center">
            <Typography fontWeight="bold" component="h1" fontSize="1.4rem">
              {profile ? profile.name : 'No profile found'}
            </Typography>
            <Typography fontWeight="bold" color="rgba(0,0,0,0.3)">
              {profile ? profile.description : null}
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
            {profile ? (
              <>
                <LocationOnIcon color="primary" /> &nbsp; {profile.location}
              </>
            ) : null}
          </Typography>
          {profile ? (
            <Box m={windowWidth < 600 ? `${5} ${4}` : 5}>
              <Typography mb={1} component="h2" fontSize="1.1rem" fontWeight="bold">
                About me
              </Typography>
              <Typography>{profile.aboutMe}</Typography>
              {mockPhotos.map((item) => (
                <img key={item} className={classes.listImage} src={item} alt="Pet image" />
              ))}
            </Box>
          ) : null}
        </Grid>
        {windowWidth < 1200 ? <Divider sx={{ width: '95%' }} /> : null}
        {profile ? (
          <Grid
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
            <Rating sx={{ margin: 'auto' }} value={4} precision={0.5} readOnly />
            <RequestForm profileId={profileId} />
          </Grid>
        ) : null}
      </Grid>
    </PageContainer>
  );
}
