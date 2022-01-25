import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import { io } from 'socket.io-client';

export default function Dashboard(): JSX.Element {
  useEffect(() => {
    const socket = io();
    return () => {
      socket.disconnect();
    };
  }, []);

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
