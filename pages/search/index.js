import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { SearchIndex } from '@/components/Search';
import { SearchResults } from '@/components/Search/SearchResults';
import { fetchAPI } from '@/lib/api';

const Search = ({ categories, searchResults, tags }) => {
  const router = useRouter();
  const { query } = router;
  return (
    <Layout categories={categories.data}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <SearchIndex
            categories={categories}
            tags={tags}
            query={query ?? {}}
          />
          {Object.keys(query).length ? (
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
  console.log(query);
  let { filter, tag, category } = query;
  const tagsFilter = tag && tag != '' ? tag.split(',') : [];
  const searchResults =
    Object.keys(query).length > 0
      ? await fetchAPI('/articles', {
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
          populate: '*'
        })
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
