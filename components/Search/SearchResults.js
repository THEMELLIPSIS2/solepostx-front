import ListedArticle from '../ListedArticle';
import InfScroll from '../InfiniteScroll';

export const SearchResults = ({ searchResults }) => {
  const { data, meta } = searchResults;
  console.log(data);
  return (
    <div>
      <div>
        {data?.map((article) => {
          return <ListedArticle key={article.id} article={article} />;
        })}
      </div>
    </div>
  );
};
