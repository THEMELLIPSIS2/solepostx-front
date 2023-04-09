import Seo from '../../../components/seo';
import Layout from '../../../components/Layout';
import { fetchAPI } from '../../../lib/api';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useRouter } from 'next/router';
import InfScroll from '@/components/InfiniteScroll';

const Category = ({ category, categories, count }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  };

  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState(category.attributes.articles.data);

  const getMorePosts = async () => {
    const res = await fetchAPI('/categories', {
      filters: { slug: slug.split('/')[0] },
      populate: {
        articles: {
          populate: '*',
          start: posts.length,
          limit: 10,
          sort: 'createdAt:desc',
        },
      },
    });
    const newPosts = await res.data[0];
    setPosts([...posts, ...newPosts.attributes.articles.data]);
  };


  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Typography variant="h2" color="secondary.main">
            {category.attributes.name.toUpperCase()}
          </Typography>
          {posts.length === 0 && 'No articles yet!'}
            <InfScroll count={count.attributes.articles.data.attributes.count} posts={posts} getMorePosts={getMorePosts}/>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const matchingCategories = await fetchAPI('/categories', {
    filters: { slug: params.slug.split('/')[0] },
    populate: {
      articles: {
        populate: '*',
        limit: 10,
        sort: 'createdAt:desc',
      },
    },
  });
  const allCategories = await fetchAPI('/categories', {
    filters: { isBrand: { $eq: 'true' } },
  });
  const count = await fetchAPI('/categories', {
    filters: { slug: params.slug.split('/')[0] },
    populate: {
      articles: {
        count: true,
      },
    },
  });
  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
      count: count.data[0],
    },
  };
}

export default Category;
