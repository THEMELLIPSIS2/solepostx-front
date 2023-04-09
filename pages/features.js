import { fetchAPI } from '../lib/api';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import { useState} from 'react';
import InfScroll from '@/components/InfiniteScroll';

const Featured = ({ articles, categories }) => {
  const [posts, setPosts] = useState(articles.data);

  const getMorePosts = async () => {
    const res = await fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { featured: { $eq: 'true' } },
      publicationState: 'live',
      pagination: { start: posts.length, limit: 10 },
      sort: 'createdAt:desc',
    });
    const newPosts = await res.data;
    setPosts([...posts, ...newPosts]);
  };

  return (
    <Layout categories={categories}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Typography variant="h2" color="secondary.main">
            FEATURED
          </Typography>
          <InfScroll
            count={articles.meta.pagination.total}
            getMorePosts={getMorePosts}
            posts={posts}
          />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const [featuredRes, categoriesRes] = await Promise.all([
    fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { featured: { $eq: 'true' } },
      publicationState: 'live',
      pagination: { withCount: true, limit: 10 },
      sort: 'createdAt:desc',
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
