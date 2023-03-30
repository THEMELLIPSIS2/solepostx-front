import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Searchfield from './Searchbar.js';
import styles from './Nav.module.css';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MobileNav } from './mobileNav.js';

function Nav({ categories }) {
  const [monthYear, setMonthYear] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery('(max-width:975px)');

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
        sx={{ minHeight: '100px' }}
        className={styles.nav}
      >
        {!isMobile ? (
          <Toolbar sx={{}} className={styles.innerNav}>
            <Button size="small" color="secondary">
              Subscribe
            </Button>
            <Typography
              className={styles.logo}
              component="a"
              href="/"
              variant="h4"
              color="white"
              align="center"
              noWrap
              sx={{
                mr: 2,
                display: { md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SOLEPOST
            </Typography>

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
          </Toolbar>
        ) : (
          <Toolbar className={styles.innerNav}>
            <MobileNav categories={categories} />
          </Toolbar>
        )}
      </AppBar>
    </div>
  );
}

export default Nav;
