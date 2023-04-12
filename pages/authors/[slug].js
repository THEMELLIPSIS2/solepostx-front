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
import FacebookIcon from '@mui/icons-material/Facebook';
import IconButton from '@mui/material/IconButton';
import TikTok from '../../public/tiktok.svg';
import Link from '@mui/material/Link';
import InfScroll from '../../components/InfiniteScroll';
const Author = ({ author, count }) => {
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
    <Layout>
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
            {author.attributes.email && (
              <small>{author.attributes.email}</small>
            )}

            {author.attributes.Youtube && (
              <IconButton
                IconButton
                component={Link}
                className={styles.link}
                href={`https://youtube.com/@${author.attributes.Youtube}`}
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
            {author.attributes.TikTok && (
              <IconButton
                component={Link}
                className={styles.link}
                href={`https://tiktok.com/@${author.attributes.TikTok}`}
              >
                <TikTok style={{ width: '20px' }} />
              </IconButton>
            )}
            {author.attributes.Facebook && (
              <IconButton
                component={Link}
                className={styles.link}
                href={`https://facebook.com/${author.attributes.Facebook}`}
              >
                <FacebookIcon />
              </IconButton>
            )}
          </div>
        </div>
        <InfScroll
          getMorePosts={getMorePosts}
          count={count.attributes.articles.data.attributes.count}
          posts={posts}
        />
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

  return {
    props: {
      author: matchingAuthors.data[0],
      count: count.data[0],
    },
  };
}

export default Author;
