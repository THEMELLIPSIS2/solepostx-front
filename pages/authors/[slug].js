import { getStrapiMedia } from '../../lib/media';
import Layout from '../../components/layout';
import ListedArticle from '../../components/ListedArticle';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import styles from '../../styles/Author.module.css';
import Typography from '@mui/material/Typography';
const Author = ({ author, categories }) => {
  return (
    <Layout categories={categories.data}>
      <div className={styles.main}>
        <div className={styles.outer}>
          <div className={styles.header}>
            <div className={styles.container}>
              <img src={getStrapiMedia(author.attributes.picture)} />
            </div>
            <Typography
              variant="h1"
              color="secondary"
              style={{ alignSelf: 'center' }}
            >
              {author.attributes.name}
            </Typography>
          </div>
          <div className={styles.email}>
            <small>{author.attributes.email}</small>
          </div>
        </div>
        {author.attributes.articles.data.map((article) => {
          return <ListedArticle article={article} key={article.id} />;
        })}
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const matchingAuthors = await fetchAPI('/writers', {
    filters: { id: params.slug },
    populate: {
      articles: {
        populate: '*',
      },
      picture: true,
    },
  });
  const allCategories = await fetchAPI('/categories', {
    filters: { isBrand: { $eq: 'true' } },
  });

  return {
    props: {
      author: matchingAuthors.data[0],
      categories: allCategories,
    },
  };
}

export default Author;
