import React from 'react';
import Layout from '../components/layout';

import { HomePage } from '@/components/Homepage';
import { fetchAPI } from '../lib/api';

const Home = ({ articles, categories, homepage }) => {
  return (
    <Layout categories={categories}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <HomePage recents={articles} features={articles}/>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, categoriesRes] = await Promise.all([
    fetchAPI('/articles', { populate: ['image', 'category'] }),
    fetchAPI('/categories', { populate: '*' })
  ]);

  return {
    props: {
      articles: articlesRes.data,
      categories: categoriesRes.data,
    },
    revalidate: 1
  };
}

export default Home;
