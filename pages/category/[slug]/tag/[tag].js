import Seo from '../../../../components/seo';
import Layout from '../../../../components/layout';
import ListedArticle from '../../../../components/ListedArticle';
import { fetchAPI } from '../../../../lib/api';
import { useRouter } from 'next/router';

const CateTag = ({ catetags, categories }) => {
  // const seo = {
  //   metaTitle: category.attributes.name,
  //   metaDescription: `All ${category.attributes.name} articles`,
  // };
  const router = useRouter();
  const { slug, tag } = router.query;
  return (
    <Layout categories={categories.data}>
      {console.log(catetags)}

      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{catetags.attributes.name}</h1>
          <h2>{tag}</h2>
          {catetags.attributes.articles.data.map((article) => {
            return <ListedArticle article={article} key={article.title} />;
          })}
        </div>
      </div>
    </Layout>
  );
};


export async function getServerSideProps({ params }) {
  console.log('tag', params.tag);
  const matchingCateTags = await fetchAPI('/categories', {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: '*',
        filters: { tags: { slug: { $eqi: params.tag } } },
      },
    },
  });
  const allCategories = await fetchAPI('/categories', {filters:{isBrand:{$eq:'true'}}});
  return {
    props: {
      catetags: matchingCateTags.data[0],
      categories: allCategories,
    },

  };
}

export default CateTag;
