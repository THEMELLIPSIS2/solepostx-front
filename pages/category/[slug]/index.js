import Seo from '../../../components/seo';
import Layout from '../../../components/Layout';
import { fetchAPI } from '../../../lib/api';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useRouter } from 'next/router';
import InfScroll from '@/components/InfiniteScroll';
import TagIcon from '@mui/icons-material/Tag';
import Link from 'next/link';
import styles from '../../../styles/Other.module.css';

const Category = ({ category, count }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  };

  const getTags = () => {
    let tagGroup = [];
    let used = [];
    category.attributes.articles.data.forEach((article) => {
      article.attributes.tags.data.forEach((tag) => {
        if (!used.includes(tag.attributes.name)) {
          used.push(tag.attributes.name);
          tagGroup.push([tag.attributes.name, tag.attributes.slug]);
        }
      });
    });
    return tagGroup;
  };
  const [tags, setTags] = useState(getTags());

  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState(category.attributes.articles.data);

  const getMorePosts = async () => {
    const res = await fetchAPI('/categories', {
      filters: { slug: slug.split('/')[0] },
      populate: {
        articles: {
          populate: '*',
          start: posts.length,
          limit: 10,
          sort: 'createdAt:desc',
        },
      },
    });
    const newPosts = await res.data[0];
    setPosts([...posts, ...newPosts.attributes.articles.data]);
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Typography variant="h2" color="secondary.main">
            {category.attributes.name.toUpperCase()}
          </Typography>
          {tags && (
            <>
              <TagIcon />
              {tags.map((tag) => {
                return (
                  <Typography
                    variant="small"
                    key={tag}
                    component={Link}
                    href={`/category/${category.attributes.name}/tag/${tag[1]}`}
                    className={styles.link}
                  >{`${tag[0]} `}</Typography>
                );
              })}
            </>
          )}

          {posts.length === 0 && 'No articles yet!'}
          <InfScroll
            count={count.attributes.articles.data.attributes.count}
            posts={posts}
            getMorePosts={getMorePosts}
          />
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
        populate: '*',
        limit: 10,
        sort: 'createdAt:desc',
      },
    },
  });
  const count = await fetchAPI('/categories', {
    filters: { slug: params.slug.split('/')[0] },
    populate: {
      articles: {
        count: true,
      },
    },
  });
  return {
    props: {
      category: matchingCategories.data[0],
      count: count.data[0],
    },
  };
}

export default Category;
