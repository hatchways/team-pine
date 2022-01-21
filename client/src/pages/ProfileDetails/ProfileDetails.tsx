import { Grid, Box, Typography, Rating } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RequestForm from './RequestForm/RequestForm';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';

const boxShadow =
  '0px 0px 1.5px rgba(0, 0, 0, 0.006),0px 0px 3.6px rgba(0, 0, 0, 0.009),0px 0px 6.8px rgba(0, 0, 0, 0.011),0px 0px 12px rgba(0, 0, 0, 0.015),0px 0px 22.1px rgba(0, 0, 0, 0.027),0px 0px 48px rgba(0, 0, 0, 0.1)';

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
            <AvatarDisplay
              width={window.innerWidth < 600 ? 100 : 150}
              height={window.innerWidth < 600 ? 100 : 150}
              loggedIn
              user={{ name: 'example', email: 'example@example.com' }}
            />
          </Box>
          <Box m={window.innerWidth < 600 ? '1rem 0' : '5rem 0 1rem 0'} textAlign="center">
            <Typography fontWeight="bold" component="h1" fontSize="1.4rem">
              {mockProfile.name}
            </Typography>
            <Typography fontWeight="bold" color="rgba(0,0,0,0.3)">
              {mockProfile.description}
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
          >
            <LocationOnIcon color="primary" /> &nbsp; {mockProfile.location}
          </Typography>
          <Box m={window.innerWidth < 600 ? `${5} ${4}` : 5}>
            <Typography mb={1} component="h2" fontSize="1rem" fontWeight="bold">
              About me
            </Typography>
            <Typography>{mockProfile.aboutMe}</Typography>
          </Box>
        </Grid>
        {window.innerWidth < 600 ? <hr style={{ width: '100%' }} /> : null}
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
            ${mockProfile.payRate}/hr
          </Typography>
          <Rating sx={{ margin: 'auto' }} value={mockProfile.rating} precision={0.5} />
          <RequestForm />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
