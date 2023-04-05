import { fetchAPI } from '../lib/api';
import Layout from '../components/layout';
import ListedArticle from '../components/ListedArticle';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Videos = ({ articles, categories }) => {
  const [posts, setPosts] = useState(articles.data);
  const [hasMore, setHasMore] = useState(true);
  const getMorePosts = async () => {
    const res = await fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { youtubeURL: { $null: 'false' } },
      publicationState: 'live',
      pagination: { start: posts.length, limit: 10 },
    });
    const newPosts = await res.data;
    setPosts([...posts, ...newPosts]);
    console.log(posts);
  };

  useEffect(() => {
    setHasMore(articles.meta.pagination.total > posts.length ? true : false);
  }, [posts]);

  return (
    <Layout categories={categories}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Typography variant="h1" color="secondary">
            Videos
          </Typography>
          <InfiniteScroll
            dataLength={posts.length}
            next={getMorePosts}
            hasMore={hasMore}
            loader={
              <Typography
                variant="h4"
                color="secondary"
                style={{ textAlign: 'center' }}
              >
                Loading...
              </Typography>
            }
            endMessage={
              <Typography
                variant="h4"
                color="secondary"
                style={{ textAlign: 'center' }}
              >
                End
              </Typography>
            }
            style={{ overflow: 'hidden' }}
          >
            {posts.map((article) => {
              return <ListedArticle article={article} key={article.id} />;
            })}
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};
export async function getStaticProps() {
  // Run API calls in parallel
  const [videoRes, categoriesRes] = await Promise.all([
    fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { youtubeURL: { $null: false } },
      publicationState: 'live',
      pagination: { withCount: true, limit: 10 },
    }),

    fetchAPI('/categories', { filters: { isBrand: { $eq: 'true' } } }),
  ]);

  return {
    props: {
      articles: videoRes,
      categories: categoriesRes.data,
    },
    revalidate: 1,
  };
}
export default Videos;
