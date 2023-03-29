import ListedArticle from '../components/ListedArticle';
import { fetchAPI } from '../lib/api';
import Layout from '../components/layout';

export async function getStaticProps() {
  // Run API calls in parallel
  const [featuredRes, categoriesRes] = await Promise.all([
    fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { featured: { $eq: 'true' } },
      publicationState: 'live',
    }),
    fetchAPI('/categories', { filters: { isBrand: { $eq: 'true' } } }),
  ]);

  return {
    props: {
      articles: featuredRes.data,
      categories:categoriesRes.data
    },
    revalidate: 1,
  };
}

const Featured = ({ articles,categories }) => {
  return (
    <Layout categories={categories}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Featured</h1>
          {articles.map((article) => {
            return <ListedArticle article={article} key={article.title} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Featured;
