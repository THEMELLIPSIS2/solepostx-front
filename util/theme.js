import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#222222',
      contrastText: '#fff',
    },
    background: {
      paper: '#222222',
      default: '#4d4d4d',
    },
    secondary: {
      main: '#F0F0F0',
      contrastText: '#343434',
    },
    info: {
      main: '#fff',
    },
  },
});
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F0F0F0',
      contrastText: '#222222',
    },
    background: {
      paper: '#878787',
      default: '#DFDFDF',
      playlist:'#702727'
    },
    secondary: {
      main: '#1A1A1A',
      contrastText: '#fff',
    },
    info: {
      main: '#fff',
    },
  },
});
