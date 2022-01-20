import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';

const boxShadow =
  '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)';

const mockProfile = {
  name: 'Norma Byers',
  description: 'Loving pet sitter',
  location: 'Toronto, Ontario',
  aboutMe:
    'Animals are my passion! I will look after your pets with loving care. I have some availability for pet care in my home as well. I have 10 yrs experience at the Animal Hospital, and have owned multiple pets for many years, including numerous rescues. Kindly email, text or call me and I will respond promptly!',
};

export default function ProfileDetails(): JSX.Element {
  return (
    <PageContainer>
      <Grid justifyContent="space-around" container>
        <Grid xs={10} md={6} item boxShadow={boxShadow} container justifyContent="center">
          <Box textAlign="center">
            <Typography fontWeight="bold" component="h1" fontSize="1.2rem">
              {mockProfile.name}
            </Typography>
            <Typography fontWeight="bold" color="rgba(0,0,0,0.26)">
              {mockProfile.description}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={10} md={4} item boxShadow={boxShadow} container>
          <Box>
            <Typography>Hello</Typography>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
