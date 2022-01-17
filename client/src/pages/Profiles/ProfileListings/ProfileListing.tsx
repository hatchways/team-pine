import React, { ReactElement, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  ListItemText,
  Menu,
  ListItem,
  List,
  Avatar,
  Typography,
  ListItemAvatar,
  Badge,
  Button,
} from '@mui/material';
import useStyles from './useStyles';
import PageContainer from '../../../components/PageContainer/PageContainer';
import { Link as RouterLink } from 'react-router-dom';

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
  address: string;
  pay: string;
  _id: string;
  photo: string;
}

type Profiles = Profile[];

export default function ProfileListing({}: Props): ReactElement {
  //currently fake profiles for state
  const [profiles, setProfiles] = useState<Profiles>([
    {
      userId: '61df3960442e349d92bad441',
      name: 'Roland Matheson',
      title: 'Pet Lover',
      description: 'I love dogcats',
      address: 'Tokyo, Japan',
      pay: '$99/Hour',
      _id: '61df3960442e349d9200000',
      photo: 'fakeimage',
    },
    {
      userId: '61df3960442e349d92bad441',
      name: 'Roland Matheson',
      title: 'Pet Lover',
      description: 'I love dogcats',
      address: 'Tokyo, Japan',
      pay: '$99/Hour',
      _id: '61df3960442e349d9200000',
      photo: 'fakeimage',
    },
    {
      userId: '61df3960442e349d92bad441',
      name: 'Roland Matheson',
      title: 'Pet Lover',
      description: 'I love dogcats',
      address: 'Tokyo, Japan',
      pay: '$99/Hour',
      _id: '61df3960442e349d9200000',
      photo: 'fakeimage',
    },
  ]);

  console.log(profiles);

  // use this later when we can integrate
  //   useEffect(() => {
  //     getProfiles().then((res) => {

  //       const profiles = res.success.profiles;
  //       setProfiles(profiles);

  //     });
  //   }, []);

  return (
    <PageContainer>
      <Grid container>
        <Typography gutterBottom variant="h2" component="div">
          {`Your search results`}
        </Typography>
        {profiles.length &&
          profiles.map((profile) => {
            <Grid key={profile.userId} item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea component={RouterLink} target="_blank" to={`/profile${profile._id}`}>
                  <CardMedia>
                    {' '}
                    <Avatar alt={`${profile.name} profile picture`} src={`someimageurl/${profile.photo}`} />{' '}
                  </CardMedia>

                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {`${profile.name}`}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {`${profile.title}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${profile.description}`}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {`${profile.address}`}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {`${profile.pay}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>;
          })}
      </Grid>
    </PageContainer>
  );
}
