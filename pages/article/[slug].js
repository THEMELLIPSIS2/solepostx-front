import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/Author.module.css';
import Seo from '../../components/seo';
import Layout from '../../components/layout';
import Link from 'next/link';
import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import Typography from '@mui/material/Typography';
import TagIcon from '@mui/icons-material/Tag';
import { Card, Box, Grid } from '@mui/material';

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
        <img src={imageUrl} />
      </div>
      <Typography
        variant="h2"
        style={{ textAlign: 'center' }}
        color="secondary.main"
      >
        {article.attributes.title.toUpperCase()}
      </Typography>
            <div align="center">
              {article.attributes.youtubeURL && <iframe                
                width="853"
                height="480"
                src={`${article.attributes.youtubeURL}`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />}
            </div>
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
                {console.log(article)}
              </p>
              <div>
                {article.attributes.category && (
                  <Typography
                    variant="h5"
                    color="secondary"
                    component={Link}
                    href={`${article.attributes.category.data.attributes.slug}`}
                  >
                    {' '}
                    {article.attributes.category.data.attributes.name}
                  </Typography>
                )}
                <div>
                  <TagIcon />
                  {article.attributes.tags &&
                    article.attributes.tags.data.map((tag) => {
                      return (
                        <Typography
                          variant="p"
                          color="secondary"
                          component={Link}
                          href={`${tag.attributes.slug}`}
                        >
                          {tag.attributes.name}
                        </Typography>
                      );
                    })}
                </div>
              </div>
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
