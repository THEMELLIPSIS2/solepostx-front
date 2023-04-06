import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styles from './Homepage.module.css';
import { Card } from './card';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Typography } from '@mui/material';

export const HomePage = ({ recents = [], features = [], video = [] }) => {
  const isMobile = useMediaQuery('(max-width:950px)');

  let leftRecents = recents.slice(0, 2);
  let rightRecents = recents.slice(-2);
  return (
    <div className={styles.homepage}>
      {console.log(recents)}
      {!isMobile ? (
        <>
          <Grid
            container
            alignItems="center"
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={3} className={styles.recent}>
              {leftRecents.map((article) => {
                return (
                  <Card
                    article={article}
                    key={article.id}
                    className={styles.card}
                  />
                );
              })}
            </Grid>
            <Grid item xs={6} className={styles.featured}>
              {features.map((article) => {
                return <Card article={article} key={article.id} />;
              })}
              <Button
                component={Link}
                href="/features"
                size="large"
                color="secondary"
                className={styles.link}
              >
                See more
              </Button>
            </Grid>
            <Grid item xs={3} className={styles.recent} alignItems="center">
              {rightRecents.map((article) => {
                return (
                  <Card
                    article={article}
                    key={article.id}
                    className={styles.card}
                  />
                );
              })}
            </Grid>
          </Grid>
          <VideocamIcon
            sx={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: '50px',
            }}
          />
          <Grid
            container
            justifyContent="center"
            spacing={1}
            sx={{
              backgroundColor: '#737373',
              width: '100%',
              marginBottom: '50px',
            }}
          >
            <Grid
              item
              xs={9}
              className={styles.recent}
              alignItems="center"
              justifyContent="center"
              style={{ textAlign: 'center' }}
            >
              <iframe
                width="853"
                height="480"
                src={`${video[0].attributes.youtubeURL}`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
              <Typography
                className={styles.link}
                varaint="h6"
                component={Link}
                href={`/article/${video[0].attributes.slug}`}
                style={{display:'block'}}
              >
                {video[0].attributes.title}
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <div className={styles.mobileFeature}>
          {features.map((article) => {
            return <Card article={article} key={article.id} />;
          })}
          <Button
            className={styles.link}
            component={Link}
            href="/features"
            color="secondary"
          >
            See more
          </Button>
          <VideocamIcon
            sx={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: '50px',
            }}
          />
          <Grid
            container
            justifyContent="center"
            spacing={1}
            sx={{
              backgroundColor: '#737373',
              width: '100%',
              marginBottom: '50px',
            }}
          >
            <Grid item xs={9} alignItems="center">
              <div className={styles.frameContainer}>
                <iframe
                  src={`${video[0].attributes.youtubeURL}`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                  className={styles.iFrame}
                />
              </div>
            </Grid>

          </Grid>            <Grid item xs={3} className={styles.recent} alignItems="center">
              {rightRecents.map((article) => {
                return (
                  <Card
                    article={article}
                    key={article.id}
                    className={styles.card}
                  />
                );
              })}
            </Grid>
        </div>
      )}
    </div>
  );
};
