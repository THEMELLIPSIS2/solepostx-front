import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#222222',
      contrastText: '#fff'
    },
    background: {
      paper: '#737373'
    },
    secondary: {
      main: '#fff',
      contrastText:'#fff'
    },
    info: {
      main: '#fff'
    },
    button: {
      main:'#A26868',
      contrastText:'#A41A1C',
      hover: '#A41A1C'
    }
  }
});
