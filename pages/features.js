import { fetchAPI } from '../lib/api';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import { useState} from 'react';
import InfScroll from '@/components/InfiniteScroll';
import Seo from '../components/seo';


const Featured = ({ articles }) => {
  const [posts, setPosts] = useState(articles.data);
  const seo = {
    metaTitle: 'Features',
    metaDescription: `All featured articles`,
  };
  const getMorePosts = async () => {
    const res = await fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { featured: { $eq: 'true' },youtubeURL: { $null: 'true' } },
      publicationState: 'live',
      pagination: { start: posts.length, limit: 10 },
      sort: 'createdAt:desc',
    });
    const newPosts = await res.data;
    setPosts([...posts, ...newPosts]);
  };

  return (
    <Layout>
      <Seo seo={seo} />
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
  const [featuredRes] = await Promise.all([
    fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { featured: { $eq: 'true' }, youtubeURL: { $null: 'true' } },
      publicationState: 'live',
      pagination: { withCount: true, limit: 10 },
      sort: 'createdAt:desc',
    }),
  ]);

  return {
    props: {
      articles: featuredRes,
    },
    revalidate: 1,
  };
}
export default Featured;
