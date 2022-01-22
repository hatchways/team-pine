import React from 'react';
import { Grid, Typography } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';

export default function Dashboard(): JSX.Element {
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
