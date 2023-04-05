import ListedArticle from '../components/ListedArticle';
import { fetchAPI } from '../lib/api';
import Layout from '../components/layout';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Featured = ({ articles, categories }) => {
  const [posts, setPosts] = useState(articles.data);
  const [hasMore, setHasMore] = useState(true);
  const getMorePosts = async () => {
    const res = await fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { featured: { $eq: 'true' } },
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
        {console.log(articles)}
        <div className="uk-container uk-container-large">
          <Typography variant="h2" color="secondary.main">
            FEATURED
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
              return <ListedArticle article={article} key={article.title} />;
            })}
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [featuredRes, categoriesRes] = await Promise.all([
    fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { featured: { $eq: 'true' } },
      publicationState: 'live',
      pagination: { withCount: true, limit: 10 },
    }),
    fetchAPI('/categories', { filters: { isBrand: { $eq: 'true' } } }),
  ]);

  return {
    props: {
      articles: featuredRes,
      categories: categoriesRes.data,
    },
    revalidate: 1,
  };
}
export default Featured;
