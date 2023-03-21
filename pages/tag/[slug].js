import Seo from '../../components/seo';
import Layout from '../../components/layout';
import ListedArticle from '../../components/ListedArticle'
import { fetchAPI } from '../../lib/api';

const Tag = ({ tag, tags }) => {
  const seo = {
    metaTitle: tag.attributes.name,
    metaDescription: `All ${tag.attributes.name} articles`
  };

  return (
    <Layout tags={tags.data}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{tag.attributes.name}</h1>
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

export async function getStaticPaths() {
  const tagsRes = await fetchAPI('/tags', { fields: ['slug'] });

  return {
    paths: tagsRes.data.map((tag) => ({
      params: {
        slug: tag.attributes.slug
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const matchingTags = await fetchAPI('/tags', {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: '*'
      }
    }
  });
  const allTags = await fetchAPI('/tags');

  return {
    props: {
      tag: matchingTags.data[0],
      tags: allTags
    },
    revalidate: 1
  };
}

export default Tag;
