import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Searchfield from './Searchbar.js';
import styles from './Nav.module.css';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MobileNav } from './mobileNav.js';
import logo from '../../assets/logo2.png';
import Newsletter from './Newsletter.js';

function Nav({ categories, storedTheme }) {
  const [monthYear, setMonthYear] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery('(max-width:1040px)');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    if (month < 10) month = '0' + month;
    setMonthYear([month, year]);
  }, []);

  return (
    <div>
      <AppBar
        position="static"
        sx={{ minHeight: '100px', bgcolor: 'background.paper' }}
        className={styles.nav}
      >
        {!isMobile ? (
          <Toolbar
            sx={{ bgcolor: 'background.paper' }}
            className={styles.innerNav}
          >
            <Newsletter />
            <Link href="/">
              {' '}
              <img src={logo.src} height="100px" width="250px" />
            </Link>
            <div>
              <Link
                color="inherit"
                variant="subtitle1"
                sx={{ p: 1, flexShrink: 0 }}
                href="/features"
              >
                Features
              </Link>
              <Link
                color="inherit"
                variant="subtitle1"
                sx={{ p: 1, flexShrink: 0 }}
                href="/videos"
              >
                Videos
              </Link>
              <Link
                color="inherit"
                variant="subtitle1"
                sx={{ p: 1, flexShrink: 0 }}
                href={`/calendar/${monthYear[0]}-${monthYear[1]}`}
              >
                Release Dates
              </Link>
              <Button
                color="secondary"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Brands
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {categories.map((brand) => {
                  let capitalized = brand.attributes.name
                    .split(' ')
                    .map((word) => {
                      return word[0].toUpperCase() + word.substring(1);
                    })
                    .join(' ');
                  return (
                    <MenuItem
                      key={brand.attributes.slug}
                      component={Link}
                      href={`/category/${brand.attributes.slug}`}
                      className={styles.link}
                    >
                      {capitalized}
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
            <div className={styles.search}>
              <Searchfield />
            </div>
            <div style={{ width: '50px' }}></div>
          </Toolbar>
        ) : (
          <Toolbar
            className={styles.innerNav}
            sx={{ bgcolor: 'background.paper' }}
          >
            <MobileNav categories={categories} />
            <div style={{ width: '50px' }}></div>
          </Toolbar>
        )}
      </AppBar>
    </div>
  );
}

export default Nav;
