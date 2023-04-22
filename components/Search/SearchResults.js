import ListedArticle from '../ListedArticle';
import { Typography, Box, Card, Paper, Container } from '@mui/material';
import { SearchIndex } from '.';
import InfScroll from '../InfiniteScroll';

export const SearchResults = ({ searchResults, query }) => {
  const { data, meta } = searchResults;
  const { filter, category, tag } = query;

  return (
    <Container>
      <Typography variant="h5">Showing results for:</Typography>
      {filter ? <Typography variant="h6">Search: {filter}</Typography> : ''}
      {category ? (
        <Typography variant="h6">Category: {category}</Typography>
      ) : (
        ''
      )}
      {tag?.length > 0 ? <Typography variant="h6">Tags: {tag}</Typography> : ''}
      <Box>
        {data.length > 0
          ? data?.map((article) => {
              return <ListedArticle key={article.id} article={article} />;
            })
          : 'No Results'}
      </Box>
    </Container>
  );
};
