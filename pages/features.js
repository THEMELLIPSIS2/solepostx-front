import ListedArticle from '../components/ListedArticle';
import { fetchAPI } from '../lib/api';
import Layout from '../components/layout';
import Typography from '@mui/material/Typography';
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
      categories: categoriesRes.data,
    },
    revalidate: 1,
  };
}

const Featured = ({ articles, categories }) => {
  return (
    <Layout categories={categories}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Typography variant="h2" color="secondary.main">
            FEATURED
          </Typography>
          {articles.map((article) => {
            return <ListedArticle article={article} key={article.title} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Featured;
