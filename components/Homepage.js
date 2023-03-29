import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import styles from './Homepage.module.css';
import { Card } from './card';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';

export const HomePage = ({ recents = [], features = [] }) => {
  let [today, setToday] = useState(null);
  const isMobile = useMediaQuery('(max-width:950px)');
  useEffect(() => {
    setToday(new Date());
  }, []);

  function howLongAgo(date) {
    let rightDate = new Date(date);
    let seconds = Math.floor((today - rightDate) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + ' years';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' months';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' days';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
  }

  return (
    <div className={styles.homepage} style={{ width: '100%' }}>
      {!isMobile ? (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            {recents.map((article) => {
              let date = article.attributes.createdAt;
              let age = howLongAgo(date);
              return (
                <Card
                  article={article}
                  age={age}
                  key={article.id}
                  className={styles.card}
                />
              );
            })}
          </Grid>
          <Grid item xs={5}>
            {features.map((article) => {
              let date = article.attributes.createdAt;
              let age = howLongAgo(date);
              return <Card article={article} age={age} key={article.id} />;
            })}
            <Button component={Link} href='/features'>More Featured</Button>
          </Grid>
          <Grid item xs={2}>
            <Paper>Socials</Paper>
          </Grid>
        </Grid>
      ) : (
        <div className={styles.mobileFeature}>
          {features.map((article) => {
            let date = article.attributes.createdAt;
            let age = howLongAgo(date);
            return <Card article={article} age={age} key={article.id} />;
          })}
          <Button component={Link} href='/features'>More Featured</Button>
        </div>
      )}
    </div>
  );
};
