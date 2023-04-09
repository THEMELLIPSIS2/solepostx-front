import Layout from '../../../../components/Layout';
import { fetchAPI } from '../../../../lib/api';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useRouter } from 'next/router';
import InfScroll from '@/components/InfiniteScroll';

const CateTag = ({ catetags, categories, count }) => {
  const router = useRouter();
  const { slug, tag } = router.query;
  const [posts, setPosts] = useState(catetags.attributes.articles.data);

  const getMorePosts = async () => {
    const res = await fetchAPI('/categories', {
      filters: { slug: slug },
      populate: {
        articles: {
          populate: '*',
          filters: { tags: { slug: { $eqi: tag } } },
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
    <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Typography variant="h2" color="secondary.main">
            {catetags.attributes.name.toUpperCase()}
          </Typography>
          <Typography variant="h4" color="secondary">
            {tag}
          </Typography>
          <InfScroll
            count={count.attributes.articles.data.attributes.count}
            posts={posts}
            getMorePosts={getMorePosts}
          />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const matchingCateTags = await fetchAPI('/categories', {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: '*',
        filters: { tags: { slug: { $eqi: params.tag } } },
        limit: 10,
        sort: 'createdAt:desc',
      },
    },
  });
  const allCategories = await fetchAPI('/categories', {
    filters: { isBrand: { $eq: 'true' } },
  });
  const count = await fetchAPI('/categories', {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: ['tags'],
        filters: { tags: { slug: { $eqi: params.tag } } },
        count: true,
      },
    },
  });
  return {
    props: {
      catetags: matchingCateTags.data[0],
      categories: allCategories,
      count: count.data[0],
    },
  };
}

export default CateTag;
