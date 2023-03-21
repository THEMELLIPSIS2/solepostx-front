import React from 'react';
import Layout from '../components/layout';
import '../styles/Home.module.css'
import { HomePage } from '@/components/Homepage';
import { fetchAPI } from '../lib/api';

const Home = ({ articles }) => {
  return (
    <Layout>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({params}) {
  // Run API calls in parallel
  const [articlesRes] = await Promise.all([
    fetchAPI('/articles', { populate: '*', filters: {releaseDate: {$eqi: params.date}}, publicationState:'live'}),

  ]);

  return {
    props: {
      articles: articlesRes.data,
    },
    revalidate: 1
  };
}

export default Home;