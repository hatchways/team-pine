import { Box, Typography } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';

import dogNotFound from '../../images/notFound/dog_not_found.png';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles({
  image: {
    width: '100%',
  },
});

export default function NotFound(): JSX.Element {
  const classes = useStyles();
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
      <Box sx={{ width: windowWidth < 600 ? '100%' : '50%', margin: '0 auto', textAlign: 'center' }}>
        <Typography
          sx={{
            color: 'primary.main',
            textAlign: 'center',
          }}
          variant="h2"
        >
          Sorry we couldn&apos;t get that page.
        </Typography>
        <Box sx={{ width: windowWidth < 600 ? 300 : 600, margin: '20px auto' }}>
          <img className={classes.image} src={dogNotFound} />
        </Box>
      </Box>
    </PageContainer>
  );
}
