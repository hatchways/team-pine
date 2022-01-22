import React, { ReactElement, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Rating,
  Box,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import useStyles from './useStyles';
import PageContainer from '../../../components/PageContainer/PageContainer';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { PinDrop } from '@mui/icons-material';
import listProfiles from '../../../helpers/APICalls/listProfiles';
import { useSnackBar } from '../../../context/useSnackbarContext';

interface Props {
  location: string;
  dropIn: Date;
  dropOff: Date;
}

interface Profile {
  userId: string;
  name: string;
  title: string;
  description: string;
  location: string;
  payRate: string;
  _id: string;
  photo: string;
}

type Profiles = Profile[];

export default function ProfileListing({}: Props): ReactElement {
  const [profiles, setProfiles] = useState<Profiles>([]);
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const { availability, location } = useParams<{ availability?: string; location?: string }>();

  useEffect(() => {
    if (availability && location) {
      listProfiles(availability, location).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          const profiles = data.success.profiles;
          setProfiles(profiles);
        } else {
          // should not get here from backend but this catch is for an unknown issue
          console.error({ data });
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    }
  }, [availability, location, updateSnackBarMessage]);

  return (
    <PageContainer>
      <Box margin={{ md: 10 }}>
        <Typography className={classes.header} variant="h3" component="div">
          {`Your search results`}
        </Typography>

        <Grid container spacing={2}>
          {profiles.length > 0 &&
            profiles.map((profile) => (
              <Grid key={profile.userId} item md={'auto'}>
                <Card className={classes.profileCard}>
                  <CardActionArea component={RouterLink} target="_blank" to={`/profile${profile._id}`}>
                    <CardMedia>
                      {' '}
                      <Avatar
                        sx={{ width: 80, height: 80 }}
                        className={classes.profileAvatar}
                        alt={`${profile.name} profile picture`}
                        src={`someimageurl/${profile.photo}`}
                      />{' '}
                    </CardMedia>

                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div">
                        {`${profile.name}`}
                      </Typography>
                      <Typography gutterBottom variant="h5" color="text.secondary" component="div">
                        {`${profile.title}`}
                      </Typography>

                      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />

                      <Typography
                        sx={{ fontWeight: 500, paddingTop: '5px', paddingBottom: '5px' }}
                      >{`${profile.description}`}</Typography>
                      <Divider />
                      <Grid container spacing={2}>
                        {' '}
                        <Grid item xs={1}>
                          <PinDrop color="primary" />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography className={classes.profileAddress} color="text.secondary">
                            {`${profile.location}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ fontWeight: 1000 }} className={classes.profilePay} color="text.secondary">
                            {profile.payRate ? `${profile.payRate}$ /hr` : ''}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Button
          sx={{ margin: 'auto', display: 'block' }}
          color="inherit"
          className={classes.button}
          onClick={() => window.alert('I was clicked')}
        >
          {' '}
          Show more{' '}
        </Button>
      </Box>
    </PageContainer>
  );
}
