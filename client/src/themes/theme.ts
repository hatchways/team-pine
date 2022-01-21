import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  // TODO: Box shadows
  palette: {
    primary: {
      main: '#f14140',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Open Sans", "sans-serif"',
    fontSize: 12,
    button: {
      fontWeight: 700,
    },
  },
});
