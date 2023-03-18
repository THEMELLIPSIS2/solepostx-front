import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Searchfield from './Searchbar.js'
import styles from './Nav.module.css'

const StyledToolbar = styled(Toolbar)(() => ({
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 128,
  },
}));

function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }} className={styles.nav}>
      <AppBar position="static">
        <StyledToolbar>

          <Button size="small" color='inherit'>Subscribe</Button>

          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Typography  className={styles.logo} component="a" href='/' variant="h3" color='white' align="center" noWrap    sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
          SOLEPOST
            </Typography>
          </Toolbar>

          <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between'}}>
          
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}
              href='/features'
              >
                    Features
              </Link>
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}>
                    Videos
              </Link>
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}>
                    Release Dates
              </Link>
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}
              href='/category/jordan'
              >
                    Jordan Brand
              </Link>
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}
              href='/category/adidas'
              >
                    Adidas
              </Link>
              <Link color="inherit" variant="subtitle1" sx={{ p: 1, flexShrink: 0 }}
              href='/category/nike'
              >
                    Nike
              </Link>
            
          </Toolbar>
  <Searchfield />


        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

export default Nav;
