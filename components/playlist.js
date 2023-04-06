import { useState, useEffect } from 'react';
import styles from './Playlist.module.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export function Playlist({ videos }) {
  const [picked, setPicked] = useState(videos[0]);

  function pickNew(video) {
    setPicked(video);
    console.log(picked);
  }
  return (
    <Paper style={{ padding: '10px' }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={8}>
          <Typography
            variant="h4"
            color="secondary"
            component={Link}
            href={`/article/${picked.attributes.slug}`}
            className={styles.link}
          >
            {picked.attributes.title.toUpperCase()}
          </Typography>
          <Paper className={styles.frameContainer} style={{ height: '600px' }}>
            <iframe
              key={picked.id}
              src={`${picked.attributes.youtubeURL}`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
              className={styles.iFrame}
            />
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          style={{ overflowY: 'scroll', height: '600px' }}
        >
          {videos.map((video) => {
            let capitalized = video.attributes.title
              .split(' ')
              .map((word) => {
                return word[0].toUpperCase() + word.substring(1);
              })
              .join(' ');
            return (
              <Paper
                key={video.id}
                className={styles.frameContainer}
                onClick={() => pickNew(video)}
                onKeyDown={() => pickNew(video)}
                style={{ cursor: 'pointer', height: '400px' }}
                component="button"
              >
                <iframe
                  width="853"
                  height="460"
                  src={`${video.attributes.youtubeURL}`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                  className={styles.iFrame}
                  key={video.id}
                  style={{ pointerEvents: 'none' }}
                  tabIndex="-1"
                />
                <Typography
                  variant="h6"
                  color="secondary"
                  style={{ position: 'absolute', bottom: 0, left: 10 }}
                >
                  {capitalized}
                </Typography>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
}
