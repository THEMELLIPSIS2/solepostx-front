import Seo from '../../components/seo';
import Layout from '../../components/layout';
import ListedArticle from '../../components/ListedArticle'
import { fetchAPI } from '../../lib/api';
import Typography from '@mui/material/Typography';
const Tag = ({ tag, categories }) => {
  const seo = {
    metaTitle: tag.attributes.name,
    metaDescription: `All ${tag.attributes.name} articles`
  };

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
        <Typography variant='h2' color='secondary.main'>{(tag.attributes.name).toUpperCase()}</Typography>
          {tag.attributes.articles.data.map(article => {
            return (
            <ListedArticle article={article} key={article.title} />
            )
          })}
         
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const matchingTags = await fetchAPI('/tags', {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: '*'
      }
    }
  });
  const allTags = await fetchAPI('/tags');
  const allCategories = await fetchAPI('/categories', {filters:{isBrand:{$eq:'true'}}});
  return {
    props: {
      tag: matchingTags.data[0],
      tags: allTags,
      categories: allCategories
    },
  };
}

export default Tag;
