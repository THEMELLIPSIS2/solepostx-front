import Nav from './nav';
import styles from './layout.module.css';
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '../../util/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from './Footer';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect, useRef } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useAppContext } from '@/pages/_app';
import Newsletter from './Newsletter';

const Layout = ({ children, seo }) => {
  const context = useAppContext();
  const isBrowser = () => typeof window !== 'undefined';
  let [storedTheme, setStoredTheme] = useState();
  const [showButton, setShowButton] = useState(false);

  // scroll to top button
  const handleShowButton = () => {
    if (isBrowser()) {
      if (!showButton && window.scrollY > 200) {
        setShowButton(true);
        return;
      }
      if (!showButton && window.scrollY <= 200) {
        setShowButton(false);
        return;
      }
    }
  };
  if (isBrowser()) window.addEventListener('scroll', handleShowButton);
  useEffect(() => {
    if (isBrowser()) {
      return window.removeEventListener('scroll', handleShowButton);
    }
  });
  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // theme logic
  useEffect(() => {
    let theme = JSON.parse(localStorage.getItem('theme'));
    if (!theme) {
      localStorage.setItem('theme', JSON.stringify('dark'));
    }
    setStoredTheme(theme);
  }, []);
  function toggleTheme() {
    if (storedTheme === 'light') {
      setStoredTheme('dark');
      localStorage.setItem('theme', JSON.stringify('dark'));
    } else {
      setStoredTheme('light');
      localStorage.setItem('theme', JSON.stringify('light'));
    }
  }

  return (
    <>
      {storedTheme && (
        <ThemeProvider theme={storedTheme === 'light' ? lightTheme : darkTheme}>
          <CssBaseline />
          <Nav
            categories={context.categories}
            className={styles.nav}
            storedTheme={storedTheme}
          />
          <IconButton
            onClick={toggleTheme}
            style={{ position: 'absolute', top: '30px', right: '10px' }}
          >
            {storedTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          {showButton && (
            <IconButton
              onClick={scrollToTop}
              sx={{
                position: 'fixed',
                bottom: '30px',
                right: '10px',
                backgroundColor: 'secondary.contrastText',
                zIndex: '9999',
              }}
            >
              <ArrowUpwardIcon />
            </IconButton>
          )}
          {showButton && (  <div style={{
                position: 'fixed',
                bottom: '30px',
                left: '10px',
                backgroundColor: 'secondary.contrastText',
                zIndex: '9999',
              }}>
           <Newsletter       
                  />
              </div>)}
        
          <div style={{ minHeight: '100vh' }}>{children}</div>
          <Footer socials={context.Socials} />
        </ThemeProvider>
      )}
    </>
  );
};

export default Layout;
