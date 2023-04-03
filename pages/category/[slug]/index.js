import Seo from '../../../components/seo';
import Layout from '../../../components/layout';
import ListedArticle from '../../../components/ListedArticle'
import { fetchAPI } from '../../../lib/api';
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography';
const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`
  };


  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Typography variant='h2' color='secondary.main'>{(category.attributes.name).toUpperCase()}</Typography>
          {category.attributes.articles.data.map(article => {
            return (
            <ListedArticle article={article} key={article.slug} />
            )
          })}
        </div>
      </div>
    </Layout>
  );
};


export async function getServerSideProps({ params }) {  
  
  const matchingCategories = await fetchAPI('/categories', {
    filters: { slug: params.slug.split('/')[0] },
    populate: {
      articles: {
        populate: '*'
      }
    }
  });
  const allCategories = await fetchAPI('/categories', {filters:{isBrand:{$eq:'true'}}});

  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories
    },

  };
}

export default Category;
