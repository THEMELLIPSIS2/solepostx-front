import Seo from '../../../../components/seo';
import Layout from '../../../../components/layout';
import ListedArticle from '../../../../components/ListedArticle';
import { fetchAPI } from '../../../../lib/api';
import { useRouter } from 'next/router'

const CateTag = ({catetags}) => {
  //   const seo = {
  //     metaTitle: category.attributes.name,
  //     metaDescription: `All ${category.attributes.name} articles`
  //   };
const router = useRouter()
const {slug,tag} = router.query
  return (
    <Layout>
      {console.log(catetags)}

      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{catetags.attributes.name}</h1>
          <h2>{tag}</h2>
          {catetags.attributes.articles.data.map(article => {
            return (
            <ListedArticle article={article} />
            )
          })}
         
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI('/categories', { fields: ['slug'] });
  const tagsRes = await fetchAPI('/tags', { fields: ['slug'] });
if(tagsRes.data.length > categoriesRes.data.length){
  return {
    paths: tagsRes.data.map((tag,i) => ({
      params: {
        slug: categoriesRes.data[i] ? categoriesRes.data[i].attributes.slug : 'no',
        tag: tag.attributes.slug || 'no'
      }
    })),
    fallback: true
  };
}
  return {
    paths: categoriesRes.data.map((category,i) => ({
      params: {
        slug: category.attributes.slug || 'no',
        tag: tagsRes.data[i] ? tagsRes.data[i].attributes.slug : 'no'
      }
    })),
    fallback: true
  };
}

export async function getStaticProps({ params }) {  
  console.log('tag',params.tag)
  const matchingCateTags = await fetchAPI('/categories', {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: '*',
         filters: {tags: {slug: {$eqi: params.tag}}},
      }
    }
  });

  return {
    props: {
      catetags: matchingCateTags.data[0],

    },
    revalidate: 1
  };
}

export default CateTag;
