import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Searchfield from './Searchbar.js'


const StyledToolbar = styled(Toolbar)(() => ({
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 128,
  },
}));

function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>

          <Button size="small" color='inherit'>Subscribe</Button>

          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Typography component="h2" variant="h3" color="inherit" align="flex-start" noWrap sx={{ flex: 1 }}>
              SOLEPOST
            </Typography>
          </Toolbar>

          <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between'}}>
          
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}>
                    Features
              </Link>
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}>
                    Videos
              </Link>
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}>
                    Release Dates
              </Link>
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}>
                    Jordan Brand
              </Link>
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}>
                    Adidas
              </Link>
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}>
                    Nike
              </Link>
              <Searchfield />
          </Toolbar>

          {/* <Searchfield /> */}

        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

Nav.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Nav;
