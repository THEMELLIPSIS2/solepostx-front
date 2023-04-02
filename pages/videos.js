import { fetchAPI } from '../lib/api';
import Layout from '../components/layout';
import ListedVideo from '../components/ListedVideo';

export async function getStaticProps() {
  // Run API calls in parallel
  const [featuredRes, categoriesRes] = await Promise.all([
    fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { videoURL: { $null: false } },
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

const Featured = ({ articles, categories }) => {
  return (
    <Layout categories={categories}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Videos</h1>
          {articles.map((article) => {
            return <ListedVideo article={article} key={article.title} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Featured;