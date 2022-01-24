import { Grid, Box, Typography, Rating, Divider } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RequestForm from './RequestForm/RequestForm';
import useStyles from './useStyles';
import { useEffect, useState } from 'react';

const mockProfile = {
  name: 'Norma Byers',
  description: 'Loving pet sitter',
  location: 'Toronto, Ontario',
  aboutMe:
    'Animals are my passion! I will look after your pets with loving care. I have some availability for pet care in my home as well. I have 10 yrs experience at the Animal Hospital, and have owned multiple pets for many years, including numerous rescues. Kindly email, text or call me and I will respond promptly!',
  payRate: 14,
  rating: 4,
};

export default function ProfileDetails(): JSX.Element {
  const classes = useStyles();

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
            <AvatarDisplay
              width={windowWidth < 600 ? 100 : 150}
              height={windowWidth < 600 ? 100 : 150}
              loggedIn
              user={{ name: 'example', email: 'example@example.com' }}
            />
          </Box>
          <Box m={windowWidth < 600 ? '1rem 0' : '5rem 0 1rem 0'} textAlign="center">
            <Typography fontWeight="bold" variant="h1">
              {mockProfile.name}
            </Typography>
            <Typography fontWeight="bold" color="rgba(0,0,0,0.3)">
              {mockProfile.description}
            </Typography>
          </Box>
          <Typography margin="auto" mb={4} display="flex" alignItems="center" color="rgba(0,0,0,0.3)" fontWeight="bold">
            <LocationOnIcon color="primary" /> &nbsp; {mockProfile.location}
          </Typography>
          <Box m={windowWidth < 600 ? `${5} ${4}` : 5}>
            <Typography mb={1} variant="h2" fontWeight="bold">
              About me
            </Typography>
            <Typography>{mockProfile.aboutMe}</Typography>
          </Box>
        </Grid>
        {windowWidth < 1200 ? <Divider sx={{ width: '95%' }} /> : null}
        <Grid
          xs={12}
          lg={4}
          item
          borderRadius={2}
          boxShadow={windowWidth < 1200 ? 'none' : 4}
          container
          flexDirection="column"
        >
          <Typography variant="h2" component="p" fontWeight="bold" m="3rem auto 1rem auto">
            ${mockProfile.payRate}/hr
          </Typography>
          <Rating sx={{ margin: 'auto' }} value={mockProfile.rating} precision={0.5} readOnly />
          <RequestForm />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
