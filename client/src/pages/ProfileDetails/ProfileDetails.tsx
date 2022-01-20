import { Grid, Box, Typography, Rating } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RequestForm from './RequestForm/RequestForm';
import { FormikHelpers } from 'formik';

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
  const handleSubmit = (
    { startDate, endDate }: { startDate: Date; endDate: Date },
    { setSubmitting }: FormikHelpers<{ startDate: Date; endDate: Date }>,
  ) => {
    console.log(startDate, endDate);
  };

  return (
    <PageContainer>
      <Grid justifyContent="space-around" container>
        <Grid
          ml="2.5rem"
          xs={10}
          md={6}
          item
          borderRadius=".4rem"
          boxShadow={boxShadow}
          container
          flexDirection="column"
        >
          <Box m="2rem 0 1rem 0" textAlign="center">
            <Typography fontWeight="bold" component="h1" fontSize="1.2rem">
              {mockProfile.name}
            </Typography>
            <Typography fontWeight="bold" color="rgba(0,0,0,0.3)">
              {mockProfile.description}
            </Typography>
          </Box>
          <Typography
            margin="auto"
            mb="2rem"
            display="flex"
            alignItems="center"
            color="rgba(0,0,0,0.3)"
            fontSize=".8rem"
            fontWeight="bold"
          >
            <LocationOnIcon color="primary" /> &nbsp; {mockProfile.location}
          </Typography>
          <Box m="2rem">
            <Typography mb=".4rem" component="h2" fontSize="1rem" fontWeight="bold">
              About me
            </Typography>
            <Typography>{mockProfile.aboutMe}</Typography>
          </Box>
        </Grid>
        <Grid xs={10} md={4} item borderRadius=".4rem" boxShadow={boxShadow} container flexDirection="column">
          <Typography fontSize="1.2rem" fontWeight="bold" m="3rem auto 1rem auto">
            ${mockProfile.payRate}/hr
          </Typography>
          <Rating sx={{ margin: '0 auto 2rem auto' }} value={mockProfile.rating} precision={0.5} />
          <RequestForm handleSubmit={handleSubmit}></RequestForm>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
