import { createTheme } from '@mui/material/styles';
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    Green?: Palette['primary'];
  }
  interface PaletteOptions {
    Green?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f14140',
    },
    Green: {
      main: '#008000',
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

declare module '@mui/material/Badge' {
  interface BadgePropsColorOverrides {
    Green: true;
  }
}
