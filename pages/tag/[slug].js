import Seo from '../../components/seo';
import Layout from '../../components/Layout';
import { fetchAPI } from '../../lib/api';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useRouter } from 'next/router';
import InfScroll from '../../components/InfiniteScroll';

const Tag = ({ tag, categories, count }) => {
  const seo = {
    metaTitle: tag.attributes.name,
    metaDescription: `All ${tag.attributes.name} articles`,
  };

  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState(tag.attributes.articles.data);

  const getMorePosts = async () => {
    const res = await fetchAPI('/tags', {
      filters: { slug: slug },
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
            {tag.attributes.name.toUpperCase()}
          </Typography>
          <InfScroll
            getMorePosts={getMorePosts}
            count={count.attributes.articles.data.attributes.count}
            posts={posts}
          />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const matchingTags = await fetchAPI('/tags', {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: '*',
        limit: 10,
        sort: 'createdAt:desc',
      },
    },
  });
  const allTags = await fetchAPI('/tags');
  const allCategories = await fetchAPI('/categories', {
    filters: { isBrand: { $eq: 'true' } },
  });
  const count = await fetchAPI('/tags', {
    filters: { slug: params.slug },
    populate: {
      articles: {
        count: true,
      },
    },
  });

  return {
    props: {
      tag: matchingTags.data[0],
      tags: allTags,
      categories: allCategories,
      count: count.data[0],
    },
  };
}

export default Tag;
