import { Card, Typography, Box } from '@mui/material';
import Image from './image';
import Link from 'next/link';
import styles from './Layout/layout.module.css';

const ListedArticle = ({ article }) => {
  let capitalized = article.attributes.title
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
  let category = article.attributes.category
    ? article.attributes.category.data.attributes.name
    : null;

  let date = new Date(article.attributes.publishedAt);
  return (
    <Card
      sx={{
        m: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexDirection: 'row',
        textAlign: {},
        maxHeight: '160px'
      }}
      className={styles.card}
    >
      <Link href={`/article/${article.attributes.slug}`}>
        <Box
          sx={{
            width: '250px',
            minWidth: '250px'
          }}
        >
          <Image image={article.attributes.image} />
        </Box>
      </Link>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          p: 1,
          gap: 1,
          width: '100%'
        }}
      >
        <Link
          href={`/category/${article.attributes.category.data.attributes.slug}`}
        >
          <Typography variant="subtitle2" color="secondary">
            {category.toUpperCase()}
          </Typography>
        </Link>
        <Link href={`/article/${article.attributes.slug}`}>
          <Typography variant="h5" color="secondary">
            {capitalized}
          </Typography>
        </Link>
        <Typography variant="caption">
          {date.toDateString().toUpperCase()}
        </Typography>
      </Box>
    </Card>
  );
};

export default ListedArticle;
