import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { HomePage } from '@/components/Homepage';
import { fetchAPI } from '../lib/api';

const Home = ({ articles, features, video }) => {
  return (
    <Layout>
      <div className={styles.index}>
        <HomePage recents={articles} features={features} video={video} />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const [articlesRes, featuredRes, videoRes] = await Promise.all(
    [
      fetchAPI('/articles', {
        populate: '*',
        filters: { featured: { $eq: 'false' }, youtubeURL: { $null: 'true' } },
        publicationState: 'live',
        pagination: { limit: 4 },
        sort: 'createdAt:desc',
      }),
      fetchAPI('/articles', {
        populate: '*',
        filters: { featured: { $eq: 'true' }, youtubeURL: { $null: 'true' } },
        publicationState: 'live',
        pagination: { limit: 1 },
        sort: 'createdAt:desc',
      }),
      fetchAPI('/articles', {
        filters: { youtubeURL: { $notNull: 'true' }, featured: {$eq:'true'} },
        pagination: { limit: 1 },
        sort: 'createdAt:desc',
      }),
    ]
  );

  return {
    props: {
      articles: articlesRes.data,
      features: featuredRes.data,
      video: videoRes.data,
    },
    revalidate: 1,
  };
}

export default Home;
