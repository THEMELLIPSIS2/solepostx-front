import { getStrapiMedia } from '../../lib/media';
import Layout from '../../components/layout';
import ListedArticle from '../../components/ListedArticle';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import styles from '../../styles/Author.module.css';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Author = ({ author, categories, count }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState(author.attributes.articles.data);
  const [hasMore, setHasMore] = useState(true);
  const getMorePosts = async () => {
    const res = await fetchAPI('/writers', {
      filters: { id: slug },
      populate: {
        articles: {
          populate: '*',
          start: posts.length,
          limit: 10,
        },
      },
    });
    const newPosts = await res.data[0];
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
      <div className={styles.main}>
        <div className={styles.outer}>
          <div className={styles.header}>
            <div className={styles.container}>
              {console.log(count)}
              <img src={getStrapiMedia(author.attributes.picture)} />
            </div>
            <Typography
              variant="h1"
              color="secondary"
              style={{ alignSelf: 'center' }}
            >
              {author.attributes.name}
            </Typography>
          </div>
          <div className={styles.email}>
            <small>{author.attributes.email}</small>
          </div>
        </div>
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
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const matchingAuthors = await fetchAPI('/writers', {
    filters: { id: params.slug },
    populate: {
      articles: {
        populate: '*',
        limit: 10,
      },
      picture: true,
    },
  });
  const count = await fetchAPI('/writers', {
    filters: { id: params.slug },
    populate: {
      articles: {
        count: true,
      },
    },
  });
  const allCategories = await fetchAPI('/categories', {
    filters: { isBrand: { $eq: 'true' } },
  });

  return {
    props: {
      author: matchingAuthors.data[0],
      categories: allCategories,
      count: count.data[0],
    },
  };
}

export default Author;
