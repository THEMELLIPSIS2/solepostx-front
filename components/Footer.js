import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material';
import { theme } from '../util/theme';


function Copyright() {
  return (
    <Typography variant="body" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        SolePost
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer(props) {
  const { description } = props;

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6}}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            {description}
          </Typography>
          <Copyright />
        </Container>
      </ThemeProvider>
    </Box>
  );
}

export default Footer;