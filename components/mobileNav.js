import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Searchfield from './Searchbar.js';
import styles from './Nav.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/logo2.png'
//drawer elements used
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';

export function MobileNav({ categories }) {
  const [drawer, setDrawer] = useState(false);
  const [monthYear, setMonthYear] = useState([]);
  const [openCollapse, setOpenCollapse] = useState(false);

  function handleOpenSettings() {
    setOpenCollapse(!openCollapse);
  }
  useEffect(() => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    if (month < 10) month = '0' + month;
    setMonthYear([month, year]);
  }, []);


  const toggleDrawer = (drawer) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawer(drawer);
  };
  return (
    <>
    <Link href='/'> <img src={logo.src} height="100px" width="250px" /></Link>

      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        sx={{
          mr: 2,
          marginLeft: 'auto',
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            p: 2,
            height: 1,
          }}
        >
          <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>

          <Divider sx={{ mb: 2, maxWidth: '300px' }} />

          <Box sx={{ mb: 2 }}>
            <ListItemButton component={Link} href="/features" className={styles.link}>
              <ListItemText primary="Features" />
            </ListItemButton>
            <ListItemButton component={Link} href="/videos" className={styles.link} >
              <ListItemText primary="Videos" />
            </ListItemButton>
            <ListItemButton component={Link} href={`/calendar/${monthYear[0]}-${monthYear[1]}`} className={styles.link}>
              <ListItemText primary="Release Dates" />
            </ListItemButton>
          </Box>
          <ListItem button onClick={handleOpenSettings}>
            <ListItemText primary="Brands" />
            <ListItemIcon>
              {!openCollapse ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowUpIcon />
              )}
            </ListItemIcon>
          </ListItem>
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <Box component="div">
              {categories.map((brand) => {
                let capitalized = brand.attributes.name
                  .split(' ')
                  .map((word) => {
                    return word[0].toUpperCase() + word.substring(1);
                  })
                  .join(' ');
                return (
                  <ListItem
                    key={brand.attributes.slug}
                    component={Link}
                    href={`/category/${brand.attributes.slug}`}
                    className={styles.link}
                  >
                    <ListItemText inset primary={capitalized} />
                  </ListItem>
                );
              })}
            </Box>
          </Collapse>

          <ListItem>
            <Searchfield />
          </ListItem>
          <ListItemButton>
            <ListItemText primary="SUBSCRIBE" />
          </ListItemButton>
        </Box>
      </Drawer>
    </>
  );
}
