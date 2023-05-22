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
        alignItems: { xs: '', sm: 'center' },
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        color: 'secondary.main'
      }}
      className={styles.card}
    >
      <Box sx={{ width: { xs: '100%', sm: '40%' } }}>
        <Link href={`/article/${article.attributes.slug}`}>
          <Image
            image={article.attributes.image}
            alt={article.attributes.title + 'cover image'}
          />
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 1, sm: 0 },
          height: '100%',
          gap: 1
        }}
      >
        {category && (
          <Link
            href={`/category/${article.attributes.category.data.attributes.slug}`}
          >
            <Typography variant="subtitle2" color="secondary">
              {category.toUpperCase()}
            </Typography>
          </Link>
        )}
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
