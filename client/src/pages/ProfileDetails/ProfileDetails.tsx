import { Grid, Box, Typography, Rating } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RequestForm from './RequestForm/RequestForm';
import useStyles from './useStyles';
import { useState, useEffect } from 'react';
import getProfile from '../../helpers/APICalls/getProfile';
import Profile from '../../interface/Profile';
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

  return (
    <PageContainer>
      <Grid m={window.innerWidth < 600 ? 2 : 4} justifyContent="space-around" container alignItems="flex-start">
        <Grid
          maxWidth="100%"
          ml={window.innerWidth < 600 ? 0 : 5}
          mb={window.innerWidth < 600 ? 3 : 0}
          xs={12}
          md={6}
          item
          borderRadius={2}
          boxShadow={window.innerWidth < 600 ? 0 : 4}
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
          <Box m={window.innerWidth < 600 ? '1rem 0' : '5rem 0 1rem 0'} textAlign="center">
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
            fontSize=".8rem"
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
            <Box m={window.innerWidth < 600 ? `${5} ${4}` : 5}>
              <Typography mb={1} component="h2" fontSize="1rem" fontWeight="bold">
                About me
              </Typography>
              <Typography mb={4}>{profile.aboutMe}</Typography>
              {mockPhotos.map((item) => (
                <img key={item} className={classes.listImage} src={item} alt="Pet image" />
              ))}
            </Box>
          ) : null}
        </Grid>
        {window.innerWidth < 600 ? <hr style={{ width: '100%' }} /> : null}
        {profile ? (
          <Grid
            xs={12}
            md={4}
            item
            borderRadius={2}
            boxShadow={window.innerWidth < 600 ? 'none' : 4}
            container
            flexDirection="column"
          >
            <Typography fontSize="1.2rem" fontWeight="bold" m="3rem auto 1rem auto">
              ${profile.payRate}/hr
            </Typography>
            <Rating sx={{ margin: 'auto' }} value={4} precision={0.5} />
            <RequestForm />
          </Grid>
        ) : null}
      </Grid>
    </PageContainer>
  );
}
