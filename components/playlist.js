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
  }
  return (
    <div
      style={{
        padding: '10px',
        maxWidth: '1500px',
        width: '100%',
        alignSelf: 'center',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          sx={{
            alignSelf: 'center',
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          {/*          
          <Typography
            variant="h4"
            color="secondary"
            component={Link}
            href={`/article/${picked.attributes.slug}`}
            className={styles.link}
          >
            {picked.attributes.title.toUpperCase()}
          </Typography> */}

          <div className={styles.frameContainer}>
            <iframe
              key={picked.id}
              src={`${picked.attributes.youtubeURL}`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
              className={styles.iFrame}
            />
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          style={{ overflowY: 'scroll', maxHeight: '550px' }}
        >
          {videos.map((video) => {
            let capitalized = video.attributes.title
              .split(' ')
              .map((word) => {
                return word[0].toUpperCase() + word.substring(1);
              })
              .join(' ');
            return (
              <div
                key={'playlist'}
                style={{
                  cursor: 'pointer',
                  border: video.id === picked.id ? '2px solid black' : 'none',
                  textAlign: 'center',
                  margin: '10px',
                  display: 'flex',
                  height:'200px'
                }}
                onClick={() => pickNew(video)}
                  onKeyDown={() => pickNew(video)}
              >
                <div
                  className={styles.frameContainerSmall}
                  component="button"
                >
                  <iframe
                    src={`${video.attributes.youtubeURL}`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                    className={styles.iFrameSmall}
                    key={video.id}
                    style={{ pointerEvents: 'none' }}
                    tabIndex="-1"
                  />
                </div>
                <Typography variant="h6" color="secondary" style={{alignSelf:'center', marginLeft:'5px',width:'50%'}}>
                  {capitalized}
                </Typography>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
