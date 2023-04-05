import Seo from '../../components/seo';
import Layout from '../../components/layout';
import ListedArticle from '../../components/ListedArticle';
import { fetchAPI } from '../../lib/api';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';

const Tag = ({ tag, categories, count }) => {
  const seo = {
    metaTitle: tag.attributes.name,
    metaDescription: `All ${tag.attributes.name} articles`,
  };

  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState(tag.attributes.articles.data);
  const [hasMore, setHasMore] = useState(true);
  const getMorePosts = async () => {
    const res = await fetchAPI('/tags', {
      filters: { slug: slug },
      populate: {
        articles: {
          populate: '*',
          start: posts.length,
          limit: 10,
        },
      },
    });
    const newPosts = await res.data[0];
    console.log(res);
    setPosts([...posts, ...newPosts.attributes.articles.data]);
    console.log(posts);
  };

  useEffect(() => {
    setHasMore(
      count.attributes.articles.data.attributes.count > posts.length
        ? true
        : false
    );
  }, [posts]);

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Typography variant="h2" color="secondary.main">
            {tag.attributes.name.toUpperCase()}
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

export async function getServerSideProps({ params }) {
  const matchingTags = await fetchAPI('/tags', {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: '*',
        limit: 10,
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
