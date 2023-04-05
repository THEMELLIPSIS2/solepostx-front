import Layout from '../../components/layout';
import '../../styles/Home.module.css';
import { fetchAPI } from '../../lib/api';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import ListedArticle from '../../components/ListedArticle';
import Button from '@mui/material/Button';
import styles from '../../styles/Calendar.module.css';

const Home = ({ articles, categories }) => {
  const [date, setDate] = useState(dayjs());
  const [monthYear, setMonthYear] = useState();

  const router = useRouter();
  useEffect(() => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    if (month < 10) month = '0' + month;
    setMonthYear([month, year]);
  }, []);
  useEffect(() => {
    let month = date.$M + 1;
    let year = date.$y;
    if (month < 10) month = '0' + month;
    setMonthYear([month, year]);
  }, [date]);

  function handleClick() {
    router.push(`/calendar/${monthYear[0]}-${monthYear[1]}`);
  }
  const sorted = {};
  articles.map((article) => {
    let day = article.attributes.releaseDate.split('-')[2];
    if (day in sorted) {
      sorted[day].push(article);
    } else {
      sorted[day] = [article];
    }
  });

  function mapArticles(articles) {
    return articles.map((article) => {
      return <ListedArticle key={article.attributes.title} article={article} />;
    });
  }

  return (
    <Layout categories={categories.data}>
      <div className={styles.container}>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(newDate) => setDate(newDate)}
              value={date}
              label={'MM YYYY'}
              views={['month', 'year']}
              className={styles.calendar}
            />
          </LocalizationProvider>
          <Button onClick={handleClick}>
            <SearchIcon />
          </Button>
        </div>
        <div>
          {Object.keys(sorted).length > 0 ? (
            Object.entries(sorted).map(([date, articles]) => {
              return (
                <div key={date}>
                  <h1>{date}</h1>
                  <div>{mapArticles(articles)}</div>
                </div>
              );
            })
          ) : (
            <div>No release dates this month!</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const [articlesRes, categoriesRes] = await Promise.all([
    fetchAPI('/articles', {
      populate: '*',
      filters: {
        releaseMonthYear: params.date,
      },
      publicationState: 'live',
      sort: 'releaseDate:asc',
    }),
    fetchAPI('/categories', { filters: { isBrand: { $eq: 'true' } } }),
  ]);

  return {
    props: {
      articles: articlesRes.data,
      categories: categoriesRes,
    },
  };
}

export default Home;
