import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import styles from './Homepage.module.css';
import { Card } from './card';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';

export const HomePage = ({ recents = [], features = [] }) => {
  const isMobile = useMediaQuery('(max-width:950px)');

  let leftRecents = recents.slice(0, 2);
  let rightRecents = recents.slice(-2);
  return (
    <div className={styles.homepage} style={{ width: '100%' }}>
      {!isMobile ? (
        <Grid container alignItems='center' rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
            <Button component={Link} href="/features">
              More Featured
            </Button>
          </Grid>
          <Grid item xs={3} className={styles.recent} alignItems='center'>
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
      ) : (
        <div className={styles.mobileFeature}>
          {features.map((article) => {
            return <Card article={article} key={article.id} />;
          })}
          <Button component={Link} href="/features">
            More Featured
          </Button>
        </div>
      )}
    </div>
  );
};
