import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import styles from './Footer.module.css';
import logo from '../assets/lgo3.png';

function Copyright() {
  return (
    <Typography variant="body" color="text.secondary" align="center" className={styles.footer}>
      {'Copyright ©'}
      <Link color="inherit" href="">
        SolePost
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <Box component="footer" 
    sx={{ bgcolor: 'background.paper', py: 3 }}>

        <Container maxWidth="lg">
          <img src={logo.src} width='90px'/>
          <Box align="left" sx={{ display: 'flex', float: 'left' }}>
            <Box
              align="left"
              color="inherit"
              component="p"
              sx={{ display: 'flex', justifyContent: 'space-between' }}
              className={styles.footer}
            >
              <Link
                href="https://www.instagram.com/thesolepost/?hl=en"
                target="_blank"
                rel="noreferrer"
                color='inherit'
                sx={{ paddingRight: 1 }}
              >
                <InstagramIcon />
              </Link>

              <Link
                href="https://twitter.com/theSolePost?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                target="_blank"
                rel="noreferrer"
                color='inherit'
                sx={{ paddingRight: 1 }}
              >
                <TwitterIcon />
              </Link>

              <Link
                href="https://www.youtube.com/@SolePost/featured"
                target="_blank"
                rel="noreferrer"
                color='inherit'
                sx={{ paddingRight: 1 }}
              >
                <YouTubeIcon />
              </Link>
              <Link
                href="https://www.facebook.com/theSolePost/"
                target="_blank"
                color='inherit'
                rel="noreferrer"
              >
                <FacebookIcon />
              </Link>
            </Box>
          </Box>

          <Box align="right" sx={{ display: 'flex', float: 'right' }}>
            <Copyright />
          </Box>
        </Container>
    </Box>
  );
}

export default Footer;
