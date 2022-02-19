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
import { Link as RouterLink, useParams } from 'react-router-dom';
import { PinDrop } from '@mui/icons-material';
import listProfiles from '../../../helpers/APICalls/listProfiles';
import { useSnackBar } from '../../../context/useSnackbarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import { Profile } from '../../../interface/Profile';

interface Props {
  location: string;
  dropIn: Date;
  dropOff: Date;
}

type Profiles = Profile[];

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function ProfileListing({}: Props): ReactElement {
  const [profiles, setProfiles] = useState<Profiles>([]);
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [formDate, setFormDate] = useState<string>('');
  const [formLocation, setFormLocation] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { availability, location } = useParams<{ availability?: string; location?: string }>();

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const debouncedFormLocation: string = useDebounce<string>(formLocation, 500);
  const debouncedFormDate: string = useDebounce<string>(formDate.toLowerCase(), 500);

  useEffect(() => {
    listProfiles(debouncedFormDate + '_' + debouncedFormDate, debouncedFormLocation).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        const profiles = data.success.profiles;
        setProfiles(profiles);
        setIsSearching(false);
      } else {
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  }, [debouncedFormLocation, debouncedFormDate, updateSnackBarMessage]);

  useEffect(() => {
    if (availability && location && !isMounted) {
      setIsMounted(true);
      listProfiles(availability, location).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          const profiles = data.success.profiles;
          setProfiles(profiles);
        } else {
          console.error({ data });
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    }
  }, [availability, location, updateSnackBarMessage, isMounted]);

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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box margin={{ md: 10 }}>
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
                <TextField
                  onChange={(event) => setFormLocation(event.target.value)}
                  id="outlined-name"
                  label="Location"
                  value={formLocation}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  required
                  onChange={(event) => setFormDate(moment(event.target.value).format('dddd'))}
                  id="date"
                  label="Date"
                  type="date"
                  defaultValue="2022-01-01"
                  value={formDate}
                  sx={{
                    width: windowWidth < 600 ? '100%' : 220,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          {isSearching ? (
            'searching...'
          ) : (
            <Grid sx={{ maxWidth: '1300px', margin: 'auto' }} container spacing={2}>
              {profiles.length > 0 &&
                profiles.map((profile) => (
                  <Grid key={profile.userId} item md={'auto'}>
                    <Card className={classes.profileCard}>
                      <CardActionArea component={RouterLink} target="_blank" to={`/profile/${profile._id}`}>
                        <CardMedia>
                          {' '}
                          <Avatar
                            sx={{ width: 100, height: 100 }}
                            className={classes.profileAvatar}
                            alt={`${profile.name} profile picture`}
                            src={`${profile.photo}`}
                          />{' '}
                        </CardMedia>

                        <CardContent>
                          <Typography gutterBottom variant="h4" component="div">
                            {`${profile.name}`}
                          </Typography>

                          <Rating name="half-rating" defaultValue={2.5} precision={0.5} readOnly />

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
                              <Typography
                                sx={{ fontWeight: 1000 }}
                                className={classes.profilePay}
                                color="text.secondary"
                              >
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
          )}
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
