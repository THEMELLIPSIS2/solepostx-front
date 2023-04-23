import Layout from '../../../../components/Layout';
import { fetchAPI } from '../../../../lib/api';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useRouter } from 'next/router';
import InfScroll from '@/components/InfiniteScroll';
import Seo from '../../../../components/seo';


const CateTag = ({ catetags, count,tagName }) => {
  const router = useRouter();
  const { slug, tag } = router.query;
  const [posts, setPosts] = useState(catetags.attributes.articles.data);

  const seo = {
    metaTitle: catetags.attributes.name,
    metaDescription: `All ${catetags.attributes.name} and ${tag} articles`,
  };

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
    <Layout>
      <Seo seo={seo} />
    <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Typography variant="h2" color="secondary.main">
            {catetags.attributes.name.toUpperCase()}
          </Typography>
          <Typography variant="h4" color="secondary">
            {tagName.attributes.name}
          </Typography>
          {posts.length === 0 && 'No articles yet!'}
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
  const tag = await fetchAPI('/tags', {
    filters: { slug: params.tag }
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
      count: count.data[0],
      tagName:tag.data[0]
    },
  };
}

export default CateTag;
