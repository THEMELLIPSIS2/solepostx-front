import React from 'react';
import Layout from '../components/layout';
import '../styles/Home.module.css'
import { HomePage } from '@/components/Homepage';
import { fetchAPI } from '../lib/api';

const Home = ({ articles, features, categories }) => {
  return (
    <Layout categories={categories}>
      <div classNa>
        <div className="uk-container uk-container-large">
          <HomePage recents={articles} features={features}/>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes,featuredRes,categoriesRes] = await Promise.all([
    fetchAPI('/articles', { populate: '*', filters: {featured: { $eq: 'false'}}, publicationState:'live', pagination: {limit:6}, sort: 'createdAt:desc' }),
    fetchAPI('/articles', { populate: '*', filters: {featured: { $eq: 'true'}}, publicationState:'live',pagination: {limit:3}, sort: 'createdAt:desc'}),
    fetchAPI('/categories', { populate: '*' })
  ]);

  return {
    props: {
      articles: articlesRes.data,
      features: featuredRes.data,
      categories: categoriesRes.data,
    },
    revalidate: 1
  };
}

export default Home;
