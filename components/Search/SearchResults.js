import ListedArticle from '../ListedArticle';
import { Typography, Box, Card, Paper, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { SearchIndex } from '.';
import InfScroll from '../InfiniteScroll';
import { fetchAPI } from '@/lib/api';

export const SearchResults = ({ searchResults, query }) => {
  const { data, meta } = searchResults;
  const { filter, category, tag } = query;
  const tagsFilter = tag && tag != '' ? tag.split(',') : [];

  const [posts, setPosts] = useState(data ?? []);
  console.log(data);
  console.log(meta);
  useEffect(() => {
    setPosts(data);
  }, [data]);
  const getMorePosts = async () => {
    const res = await fetchAPI('/articles', {
      filters: {
        $or: [
          {
            title: {
              $containsi: filter || ''
            }
          },
          {
            description: {
              $containsi: filter || ''
            }
          }
        ],
        category: {
          slug: {
            $eqi: category
          }
        },
        tags: {
          slug: {
            $in: tagsFilter
          }
        }
      },
      populate: '*',
      pagination: {
        start: posts.length,
        limit: meta.pagination.pageSize
      },
      sort: 'createdAt:desc'
    });
    const r = await res.data;
    setPosts([...posts, ...r]);
  };
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
      <InfScroll
        posts={posts}
        getMorePosts={getMorePosts}
        count={meta.pagination.total}
      />
    </Container>
  );
};
