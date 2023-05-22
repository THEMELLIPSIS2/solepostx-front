import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import styles from './Footer.module.css';
import logo from '../../assets/lgo3.png';
import TikTok from '../../public/tiktok.svg';

function Copyright() {
  return (
    <Typography
      variant="body"
      color="text.secondary"
      align="center"
      className={styles.footer}
    >
      {'Copyright ©'}
      <Link color="inherit" href="">
        SolePost
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer({ socials }) {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3 }} style={{zIndex:'9999'}}>
      <Container>
        <img src={logo.src} width="90px" />
        <Box align="left" sx={{ display: 'flex', float: 'left' }}>
          <Box
            align="left"
            color="inherit"
            
            className={styles.footer}
          >
            {socials && (
              <div>
                {socials.Instagram && (
                  <Link
                    href={`https://www.instagram.com/${socials.Instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    color="inherit"
                    sx={{ paddingRight: 1 }}
                    style={{marginRight:'10px'}}
                  >
                    <InstagramIcon />
                  </Link>
                )}

                {socials.Twitter && (
                  <Link
                    href={`https://twitter.com/${socials.Twitter}`}
                    target="_blank"
                    rel="noreferrer"
                    color="inherit"
                    sx={{ paddingRight: 1 }}
                    style={{marginRight:'10px'}}
                  >
                    <TwitterIcon />
                  </Link>
                )}

                {socials.Youtube && (
                  <Link
                    href={`https://www.youtube.com/@${socials.Youtube}`}
                    target="_blank"
                    rel="noreferrer"
                    color="inherit"
                    sx={{ paddingRight: 1 }}
                    style={{marginRight:'10px'}}
                  >
                    <YouTubeIcon />
                  </Link>
                )}
                {socials.Facebook && (
                  <Link
                    href={`https://www.facebook.com/${socials.Facebook}`}
                    target="_blank"
                    color="inherit"
                    rel="noreferrer"
                    style={{marginRight:'10px'}}
                  >
                    <FacebookIcon />
                  </Link>
                )}
                {socials.TikTok && (
                  <Link
                    href={`https://www.tiktok.com/@${socials.TikTok}`}
                    target="_blank"
                    color="inherit"
                    rel="noreferrer"
                    style={{marginRight:'5px'}}
                  >
                    <TikTok style={{ width: '20px', margin: '8px' }} />
                  </Link>
                )}
                  
              </div>
            )}    <Link
                    href={`/privacy`}
                    target="_blank"
                    color="inherit"
                    rel="noreferrer"
                    style={{marginRight:'5px'}}
                  >
                    Privacy Policy
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
