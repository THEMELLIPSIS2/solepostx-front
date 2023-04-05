import Layout from '../../../../components/layout';
import ListedArticle from '../../../../components/ListedArticle';
import { fetchAPI } from '../../../../lib/api';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';

const CateTag = ({ catetags, categories, count }) => {
  const router = useRouter();
  const { slug, tag } = router.query;

  const [posts, setPosts] = useState(catetags.attributes.articles.data);
  const [hasMore, setHasMore] = useState(true);
  const getMorePosts = async () => {
    const res = await fetchAPI('/categories', {
      filters: { slug: slug },
      populate: {
        articles: {
          populate: '*',
          filters: { tags: { slug: { $eqi: tag } } },
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
      {console.log(posts)}

      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Typography variant="h2" color="secondary.main">
            {catetags.attributes.name.toUpperCase()}
          </Typography>
          <Typography variant="h4" color="secondary">
            {tag}
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
  console.log('tag', params.tag);
  const matchingCateTags = await fetchAPI('/categories', {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: '*',
        filters: { tags: { slug: { $eqi: params.tag } } },
        limit: 10,
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
