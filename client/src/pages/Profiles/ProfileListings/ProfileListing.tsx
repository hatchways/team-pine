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
import { Theme } from '@mui/material/styles';
import PageContainer from '../../../components/PageContainer/PageContainer';
import { Link as RouterLink } from 'react-router-dom';
import { PinDrop, Search } from '@mui/icons-material';

interface Props {
  location: string;
  dropIn: Date;
  dropOff: Date;
}

//we have an interface Profile in another branch so this is just temporary

interface Profile {
  userId: string;
  name: string;
  title: string;
  description: string;
  address: string;
  pay: string;
  _id: string;
  photo: string;
}

type Profiles = Profile[];

export default function ProfileListing({}: Props): ReactElement {
  //currently fake profiles for state
  const [profiles, setProfiles] = useState<Profiles>([]);
  const classes = useStyles();

  useEffect(() => {
    // use this later when we can integrate, this is an example of getting an API resp and then setting state with it
    //   getProfiles().then((res) => {
    //   });

    const profile = {
      userId: '61df3960442e349d92bad441',
      name: 'Roland Matheson',
      title: 'Pet Lover',
      description:
        'I love dogcats Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis assumenda omnis obcaecati, cumque, nisi animi quam voluptatum tempora enim illo at id iusto! Iure eveniet cum in a, accusamus earum!',
      address: 'Tokyo, Japan',
      pay: '$99/Hour',
      _id: '61df3960442e349d9200000',
      photo: 'fakeimage',
    };
    const fakeProfiles = [profile, profile, profile, profile, profile];
    setProfiles(fakeProfiles);
  }, []);

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
                      <Typography className={classes.profileName} gutterBottom variant="h4" component="div">
                        {`${profile.name}`}
                      </Typography>
                      <Typography
                        className={classes.profileTitle}
                        gutterBottom
                        variant="h5"
                        color="text.secondary"
                        component="div"
                      >
                        {`${profile.title}`}
                      </Typography>

                      <Rating name="half-rating" className={classes.profileRating} defaultValue={2.5} precision={0.5} />

                      <Typography className={classes.profileDescription}>{`${profile.description}`}</Typography>
                      <Divider />
                      <Grid container spacing={2}>
                        {' '}
                        <Grid item xs={1}>
                          <PinDrop color="primary" />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography className={classes.profileAddress} color="text.secondary">
                            {`${profile.address}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography className={classes.profilePay} color="text.secondary">
                            {`${profile.pay}`}
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