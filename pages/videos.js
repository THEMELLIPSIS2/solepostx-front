import { fetchAPI } from '../lib/api';
import Layout from '../components/Layout';
import { useState } from 'react';
import { Playlist } from '../components/playlist';
import InfScroll from '@/components/InfiniteScroll';

const Videos = ({ articles }) => {
  const [posts, setPosts] = useState(articles.data);

  const getMorePosts = async () => {
    const res = await fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { youtubeURL: { $null: 'false' } },
      publicationState: 'live',
      pagination: { start: posts.length, limit: 10 },
      sort: 'createdAt:desc',
    });
    const newPosts = await res.data;
    setPosts([...posts, ...newPosts]);
  };

  return (
    <Layout>
      <div className="uk-section">
        <div className="uk-container uk-container-large" style={{display:'flex',flexDirection:'column',alignContent:'center'}}> 
          <div style={{ minHeight: '700px',display:'flex',flexDirection:'column' }}>
            <Playlist videos={articles.data.slice(0, 5)}/>
          </div>
          {posts.length === 0 && 'No articles yet!'}
          <InfScroll
            count={articles.meta.pagination.total}
            getMorePosts={getMorePosts}
            posts={posts}
          />
        </div>
      </div>
    </Layout>
  );
};
export async function getStaticProps() {
  const [videoRes] = await Promise.all([
    fetchAPI('/articles', {
      populate: ['image', 'category', 'tags'],
      filters: { youtubeURL: { $null: false } },
      publicationState: 'live',
      pagination: { withCount: true, limit: 10 },
      sort: 'createdAt:desc',
    }),
  ]);

  return {
    props: {
      articles: videoRes,
    },
    revalidate: 1,
  };
}
export default Videos;
