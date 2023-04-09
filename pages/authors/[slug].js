import { getStrapiMedia } from '../../lib/media';
import Layout from '../../components/Layout';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import styles from '../../styles/Author.module.css';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import InfScroll from '../../components/InfiniteScroll'
const Author = ({ author, categories, count }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState(author.attributes.articles.data);


  const getMorePosts = async () => {
    const res = await fetchAPI('/writers', {
      filters: { id: slug },
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
      <div className={styles.main}>
        <div className={styles.outer}>
          <div className={styles.header}>
            <div className={styles.container}>
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
            {author.attributes.youtube && (
              <IconButton
                IconButton
                component={Link}
                className={styles.link}
                href={`https://youtube.com/@${author.attributes.youtube}`}
              >
                <YouTubeIcon />
              </IconButton>
            )}
            {author.attributes.Instagram && (
              <IconButton
                component={Link}
                className={styles.link}
                href={`https://instagram.com/${author.attributes.Instagram}`}
              >
                <InstagramIcon />
              </IconButton>
            )}
            {author.attributes.Twitter && (
              <IconButton
                component={Link}
                className={styles.link}
                href={`https://twittter.com/${author.attributes.Twitter}`}
              >
                <TwitterIcon />
              </IconButton>
            )}
          </div>
        </div>
        <InfScroll getMorePosts={getMorePosts} count={count.attributes.articles.data.attributes.count} posts={posts}/>
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
        sort: 'createdAt:desc',
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
