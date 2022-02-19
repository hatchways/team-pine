import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import { io } from 'socket.io-client';
import { useAuth } from '../../context/useAuthContext';

export default function Dashboard(): JSX.Element {
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser) {
      const socket = io();
      return () => {
        socket.disconnect();
      };
    }
  }, [loggedInUser]);

  return (
    <PageContainer>
      <Grid container>
        <Grid xs={12} item>
          <Typography sx={{ textAlign: 'center' }} variant="h4">
            Search Profiles
          </Typography>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
