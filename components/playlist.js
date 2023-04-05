import { useState, useEffect } from 'react';
import styles from './Playlist.module.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image from './image'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

export function Playlist({ videos }) {
 

  const [picked, setPicked] = useState(videos[0]);
  const [notPicked, setNotPicked] = useState(videos.slice());

  function pickNew(video) {
    setPicked(video);
    console.log(picked);
  }
  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Paper className={styles.frameContainer} style={{ height: '600px' }}>
          <Typography
            variant="h4"
            color="secondary"
            style={{ position: 'absolute', bottom: 0, left: 20 }}
            component={Link}
            href={`/article/${picked.attributes.slug}`}
            className={styles.link}
          >
            {(picked.attributes.title).toUpperCase()}
          </Typography>
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
        sm={4}
        style={{ overflowY: 'scroll', height: '600px' }}
      >
        {notPicked.map((video) => {
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
              style={{cursor:'pointer'}}
              tabIndex='1'
              component='button'
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
                style={{ pointerEvents: 'none'}}
                tabIndex='-1'
              />
              <Typography variant='h6' color='secondary' style={{position:'absolute',bottom:0,left:10}}>{capitalized}</Typography>
            </Paper>
          );
        })}
      </Grid>
    </Grid>
  );
}
