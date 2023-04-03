import Nav from './nav';
import styles from './layout.module.css';
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '../util/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '@/components/Footer';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
const Layout = ({ children, categories, seo }) => {
  let [storedTheme,setStoredTheme] = useState()

  useEffect(()=>{
        let theme = JSON.parse(localStorage.getItem('theme'));
         if (!theme) {
      localStorage.setItem('theme', JSON.stringify('dark'));
    }   
        setStoredTheme(theme)

  })
 
  function toggleTheme(){
    if(storedTheme === 'light'){ 
      setStoredTheme('dark')
      localStorage.setItem('theme',JSON.stringify('dark'))
    }
    else{setStoredTheme('light')
  localStorage.setItem('theme',JSON.stringify('light'))
  }
    
  }

  return (
    <>
      <ThemeProvider theme={storedTheme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <Nav categories={categories} className={styles.nav} storedTheme={storedTheme}/>
        <IconButton onClick={toggleTheme} style={{position:'absolute',top:'30px',right:'10px'}}>
            {storedTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon/>}
            </IconButton>
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
