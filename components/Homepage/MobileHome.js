import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styles from './Homepage.module.css';
import { Card } from './card';
import Link from 'next/link';
import VideocamIcon from '@mui/icons-material/Videocam';



export default function MobileHome ({video,features,recents}) {
    return (
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
    </Grid>{' '}
    <Grid item xs={3} alignItems="center">
      {recents.map((article) => {
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
    )
    
}