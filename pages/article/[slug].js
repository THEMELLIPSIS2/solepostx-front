import Moment from 'react-moment';
import parse from 'html-react-parser';
import styles from '../../styles/Other.module.css';
import Seo from '../../components/seo';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import Typography from '@mui/material/Typography';
import TagIcon from '@mui/icons-material/Tag';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Card } from '@/components/Homepage/card';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

const Article = ({ article, recents }) => {
  const imageUrl = getStrapiMedia(article.attributes.image);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };



  return (
    <Layout>
      <Seo seo={seo} />

      <div className={styles.banner}>
        <img src={imageUrl} />{' '}
        <Typography
          variant="h2"
          style={{ textAlign: 'center' }}
          color="secondary.main"
          className={styles.headerText}
        >
          {article.attributes.title.toUpperCase()}
        </Typography>
      </div>

      <div align="center" style={{ marginTop: '10px' }}>
        {article.attributes.youtubeURL && (
          <iframe
            width="853"
            height="480"
            src={`${article.attributes.youtubeURL}`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        )}
      </div>
      <div className={styles.contentContainer}>
        <Paper className={styles.mainContent} elevation={8} sx={{width:{sm:'100%',md:'80%'}}}>
          {parse(article.attributes.content)}
          <hr className="uk-divider-small" style={{ marginTop: '100px' }} />
          <div>
            <div>
              <p>
                By{' '}
                <Link
                  className={styles.link}
                  href={`/authors/${article.attributes.author.data.id}`}
                >
                  {article.attributes.author.data.attributes.name}
                </Link>
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">
                  {article.attributes.published_at}
                </Moment>
              </p>

              <div>
                {article.attributes.category && (
                  <Typography
                    variant="h5"
                    color="secondary"
                    component={Link}
                    className={styles.link}
                    href={`/category/${article.attributes.category.data.attributes.slug}`}
                  >
                    {article.attributes.category.data.attributes.name}
                  </Typography>
                )}
                <div>
                  <TagIcon />

                  {article.attributes.tags &&
                    article.attributes.tags.data.map((tag) => {
                      return (
                        <Typography
                          key={tag.id}
                          variant="p"
                          color="secondary"
                          className={styles.link}
                          component={Link}
                          href={`/tag/${tag.attributes.slug}`}
                        >
                          {tag.attributes.name}
                        </Typography>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </Paper>
        <Box
          sx={{
            backgroundColor: '#222222',
            color: 'white',
            display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
            marginLeft: '5px',
            width: '350px',
            minWidth: '300px',

          }}
          className={styles.sidebar}
        >
          <Box className={styles.content}> 
          <Typography variant="h4" sx={{color:'white'}}>
                Share
              </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '10px',
               marginBottom:'60px'
              }}
            >
             
              <FacebookShareButton
                url={`https://thesolepost.com/article/${article.attributes.slug}`}
                quote={'Check out this article from Solepost!'}
                hashtag={`#${article.attributes.category.data.attributes.name}`}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton
                url={`https://thesolepost.com/article/${article.attributes.slug}`}
                quote={'Check out this article from Solepost!'}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TwitterShareButton
                url={`https://thesolepost.com/article/${article.attributes.slug}`}
                quote={'Check out this article from Solepost!'}
                hashtag={`#${article.attributes.category.data.attributes.name}`}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <a
              href={`mailto:
              ?subject=${article.attributes.title}
              &body=Hi,\n\nCheck out this article from TheSolePost! At ${`https://thesolepost.com/category/${article.attributes.category.data.attributes.slug}`}\n\nEnjoy`} target='_blank'rel="noreferrer"
              >
                <EmailIcon size={32} round />
              </a>
            </div>
            {recents.map((article) => {
              return <Card article={article} key={article.id} />;
            })}
          </Box>
          <div></div>
        </Box>
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
  const recentRes = await fetchAPI('/articles', {
    populate: '*',
    filters: { featured: { $eq: 'false' }, youtubeURL: { $null: 'true' } },
    publicationState: 'live',
    pagination: { limit: 2 },
    sort: 'createdAt:desc',
  });

  return {
    props: { article: articlesRes.data[0], recents: recentRes.data },
  };
}

export default Article;
