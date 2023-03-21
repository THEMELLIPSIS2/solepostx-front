import Seo from '../../../components/seo';
import Layout from '../../../components/layout';
import ListedArticle from '../../../components/ListedArticle'
import { fetchAPI } from '../../../lib/api';
import { useRouter } from 'next/router'

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
          <h1>{category.attributes.name}</h1>
          {category.attributes.articles.data.map(article => {
            return (
            <ListedArticle article={article} key={article.title} />
            )
          })}
         
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI('/categories', { fields: ['slug'] });

  return {
    paths: categoriesRes.data.map((category) => ({
      params: {
        slug: category.attributes.slug || null
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {  
  
  const matchingCategories = await fetchAPI('/categories', {
    filters: { slug: params.slug.split('/')[0] },
    populate: {
      articles: {
        populate: '*'
      }
    }
  });
  const allCategories = await fetchAPI('/categories');

  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories
    },
    revalidate: 1
  };
}

export default Category;
