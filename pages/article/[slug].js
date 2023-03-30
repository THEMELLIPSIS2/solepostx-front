import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/Author.module.css'
import Seo from '../../components/seo';
import Layout from '../../components/layout';
import Link from 'next/link';
import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.attributes.image);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />

      <div className={styles.banner}>
      <img src={imageUrl}  />
      </div>
      <h1 style={{textAlign:'center'}}>{article.attributes.title}</h1>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown children={article.attributes.content} />

          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By{' '}
                <Link href={`/authors/${article.attributes.id}`}>
                  {article.attributes.author.data.attributes.name}
                </Link>
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">
                  {article.attributes.published_at}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const articlesRes = await fetchAPI('/articles', {
    filters: {
      slug: params.slug,
    },
    populate: '*',
  });
  const categoriesRes = await fetchAPI('/categories', {
    filters: { isBrand: { $eq: 'true' } },
  });

  return {
    props: { article: articlesRes.data[0], categories: categoriesRes },
  };
}

export default Article;
