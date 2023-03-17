import Layout from '@/components/layout';
import { fetchAPI } from '@/lib/api';
import ListedArticle from '@/components/ListedArticle';

const testList = ({ articles, features, categories }) => {
  return (
    <Layout categories={categories.data}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          {articles.map((article) => {
            return (
              <ListedArticle article={article} key={article.attributes.slug} />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, featuredRes, categoriesRes] = await Promise.all([
    fetchAPI('/articles', {
      populate: ['image', 'category'],
      filters: { featured: { $eq: 'false' } },
      publicationState: 'live',
      pagination: { limit: 6 }
    }),
    fetchAPI('/articles', {
      populate: ['image', 'category'],
      filters: { featured: { $eq: 'true' } },
      publicationState: 'live',
      pagination: { limit: 3 }
    }),
    fetchAPI('/categories', { populate: '*' })
  ]);

  return {
    props: {
      articles: articlesRes.data,
      features: featuredRes.data,
      categories: categoriesRes.data
    },
    revalidate: 1
  };
}

export default testList;
