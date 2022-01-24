import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f14140',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Open Sans", "sans-serif"',
    fontSize: 12,
    button: {
      fontWeight: 700,
    },
    h1: {
      fontSize: '1.4rem',
    },
    h2: {
      fontSize: '1.1rem',
    },
    h3: {
      fontSize: '1rem',
    },
  },
});
