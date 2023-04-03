import Nav from './nav';
import MobileNav from './mobileNav';
import styles from './layout.module.css';
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '../util/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
const Layout = ({ children, categories, seo }) => {
  let [storedTheme,useStoredTheme] = useState()

  if (typeof window !== 'undefined') {
    storedTheme = JSON.parse(localStorage.getItem('theme'));
    if (!storedTheme) {
      localStorage.setItem('theme', JSON.stringify('dark'));
    }
  }
  return (
    <>
      <ThemeProvider theme={storedTheme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <Nav categories={categories} className={styles.nav} storedTheme={storedTheme}/>
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
