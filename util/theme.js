import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode:'dark',
    primary: {
      main: '#222222',
      contrastText: '#fff'
    },
    background: {
      paper:'#222222',
      default: '#4d4d4d',
    },
    secondary: {
      main: '#fff',
      contrastText:'#fff'
    },
    info: {
      main: '#fff'
    },

  }
});
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#222222'
    },
    background: {
      paper: '#dddddd'
    },
    secondary: {
      main: '#fff',
      contrastText:'#fff'
    },
    info: {
      main: '#fff'
    },
  }
});
