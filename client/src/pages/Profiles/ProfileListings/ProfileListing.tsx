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
  TextField,
} from '@mui/material';
import useStyles from './useStyles';
import PageContainer from '../../../components/PageContainer/PageContainer';
import { Link as RouterLink } from 'react-router-dom';
import { PinDrop } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Profile } from '../../../interface/Profile';

interface Props {
  location: string;
  dropIn: Date;
  dropOff: Date;
}

type Profiles = Profile[];

export default function ProfileListing({}: Props): ReactElement {
  const [profiles, setProfiles] = useState<Profiles>([]);
  const classes = useStyles();
  const [date, setDate] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    const profile = {
      userId: '61df3960442e349d92bad441',
      name: 'Roland Matheson',
      description:
        'I love dogcats Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis assumenda omnis obcaecati, cumque, nisi animi quam voluptatum tempora enim illo at id iusto! Iure eveniet cum in a, accusamus earum!',
      address: 'Tokyo, Japan',
      payRate: '$99/Hour',
      _id: '61df3960442e349d9200000',
      photo: 'fakeimage',
    };
    const fakeProfiles = [profile, profile, profile, profile, profile];
    setProfiles(fakeProfiles);
  }, []);

  return (
    <PageContainer>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            margin: 'auto',
            maxWidth: '1300px',
          }}
        >
          <Typography className={classes.header} variant="h3" component="div">
            {`Your search results`}
          </Typography>
          <Box
            component="form"
            sx={{
              maxWidth: '450px',
              margin: 'auto',
              padding: '10px',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <TextField id="outlined-name" label="Location" value={location} fullWidth />
              </Grid>
              <Grid item xs={5}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(newdate) => {
                    setDate(newdate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          </Box>
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

                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} readOnly />

                        <Typography
                          sx={{ fontWeight: 500, paddingTop: '5px', paddingBottom: '5px' }}
                        >{`${profile.description?.substring(0, 80)}`}</Typography>
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
                            <Typography sx={{ fontWeight: 1000 }} className={classes.profilePay} color="text.secondary">
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
      </LocalizationProvider>
    </PageContainer>
  );
}
