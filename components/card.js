import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styles from './Homepage.module.css';
import Link from 'next/link';
import { getStrapiMedia } from '../lib/media';
import { useEffect, useState } from 'react';

export const Card = ({ article }) => {
  let [date, setDate] = useState();
  useEffect(() => {
    let dateObj = new Date(article.attributes.publishedAt);
    setDate(dateObj.toDateString());
  }, []);
  let capitalized = article.attributes.title
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
  return (
    <div key={article.id} className={styles.card}>
      {console.log(article)}
      <Paper className={styles.article} style={{ margin: '10px' }}>
        <Link href={`/article/${article.attributes.slug}`}>
          <Typography className={styles.header} variant="h6">
            {capitalized}
          </Typography>
          <img
            className={styles.image}
            src={getStrapiMedia(article.attributes.image)}
          />
        </Link>
        <div className={styles.bottom}>
          <Typography variant="small" >
            {date && date.split(' ').slice(1, 3).join(' ')}
          </Typography>
          <Typography variant="small" component={Link} href={`/authors/${article.attributes.author.data.id}` }className={styles.link}>
            {article.attributes.author.data.attributes.name}
            {console.log(article)}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};
