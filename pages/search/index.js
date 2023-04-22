import Layout from '@/components/Layout';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { SearchIndex } from '@/components/Search';
import { SearchResults } from '@/components/Search/SearchResults';
import { fetchAPI } from '@/lib/api';
import InfScroll from '@/components/InfiniteScroll';
const Search = ({ categories, searchResults, tags, count }) => {
  const router = useRouter();
  const { query } = router;
  const { data, meta } = searchResults;

  return (
    <Layout categories={categories.data}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <SearchIndex
            categories={categories}
            tags={tags}
            query={query ?? {}}
          />
          {data?.length ? (
            <SearchResults searchResults={searchResults} query={query} />
          ) : (
            ''
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  let { filter, tag, category } = query;
  const tagsFilter = tag && tag != '' ? tag.split(',') : [];
  const hasQuery = Object.keys(query).length > 0;
  let searchObj = hasQuery
    ? {
        filters: {
          $or: [
            {
              title: {
                $containsi: filter || ''
              }
            },
            {
              description: {
                $containsi: filter || ''
              }
            }
          ],
          category: {
            slug: {
              $eqi: category
            }
          },
          tags: {
            slug: {
              $in: tagsFilter
            }
          }
        },
        populate: '*',
        sort: 'createdAt:desc'
      }
    : {};
  const searchResults = hasQuery
    ? await fetchAPI('/articles', { ...searchObj })
    : [];
  const categories = await fetchAPI('/categories');
  const allTags = await fetchAPI('/tags');
  return {
    props: {
      categories: categories,
      searchResults: searchResults,
      tags: allTags
    }
  };
}
