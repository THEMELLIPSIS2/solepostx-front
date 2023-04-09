import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import ListedArticle from './ListedArticle';

export default function InfScroll({posts,getMorePosts,count}){
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        setHasMore(
          count > posts.length
            ? true
            : false
        );
      }, [posts]);
return (
     <InfiniteScroll
    dataLength={posts.length}
    next={getMorePosts}
    hasMore={hasMore}
    loader={
      <Typography
        variant="h4"
        color="secondary"
        style={{ textAlign: 'center' }}
      >
        Loading...
      </Typography>
    }
    style={{ overflow: 'hidden' }}
  >
    {posts.map((article) => {
      return <ListedArticle article={article} key={article.id} />;
    })}
  </InfiniteScroll>
)
   
}