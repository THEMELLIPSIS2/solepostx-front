import { Card, Typography, Box, Grid } from '@mui/material';
import Image from './image';
import Link from 'next/link';


const ListedVideo = ({ article }) => {
  let capitalized = article.attributes.title
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
   let category = article.attributes.category.data ? article.attributes.category.data.attributes.name : null;

  let date = new Date(article.attributes.publishedAt);
  return (
    <Card
      sx={{
        m: 1,
        display: 'flex',
        alignItems: { xs: '', sm: 'center' },
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        textAlign: {}
      }}
    >
      <Box sx={{ width: { xs: '100%', sm: '40%' } }}>
        <Link href={`/article/${article.attributes.slug}`}>
          <Image image={article.attributes.image} />
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
        {category && 
        <Link href={`/category/${category}`}>
          <Typography variant="subtitle2">{category.toUpperCase()}</Typography>
        </Link> }
        <Link href={`/article/${article.attributes.slug}`}>
          <Typography variant="h5">{capitalized}</Typography>
        </Link>
        <Typography variant="caption">
          {date.toDateString().toUpperCase()}
        </Typography>
      </Box>
    </Card>
  );
};

export default ListedVideo;
