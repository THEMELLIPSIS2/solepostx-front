import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styles from './Homepage.module.css';
import { Card } from './card';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import VideocamIcon from '@mui/icons-material/Videocam';
import Typography from '@mui/material/Typography';
import MobileHome from './MobileHome'

export const HomePage = ({ recents = [], features = [], video = [] }) => {
  const isMobile = useMediaQuery('(max-width:1000px)');

  let leftRecents = recents.slice(0, 2);
  let rightRecents = recents.slice(-2);
  return (
    <div className={styles.homepage}>
      {!isMobile ? (
        <>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
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
          /> {video.length > 0 && 
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
              style={{ textAlign: 'center',maxWidth:'900px' }}
            >
              <div className={styles.frameContainer}>
              <iframe
                  width="853"
                  height="480"
                  src={`${video[0].attributes.youtubeURL}`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                  className={styles.iFrame}
                />
              </div>
              <Typography
                className={styles.link}
                variant="h6"
                component={Link}
                href={`/article/${video[0].attributes.slug}`}
                style={{ display: 'block' }}
              >
                {video[0].attributes.title}
              </Typography>
              <Button
                component={Link}
                href="/videos"
                size="large"
                color="secondary"
                className={styles.link}
              >
                See more
              </Button>
            </Grid>
          </Grid>
          }
        </>
      ) : (
        <>
<MobileHome features={features} video={video} recents={leftRecents}/>
        </>
      )}
    </div>
  );
};
