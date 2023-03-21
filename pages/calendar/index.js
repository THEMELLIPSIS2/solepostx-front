import React from 'react';
import Layout from '../../components/layout';
import '../../styles/Home.module.css';
import { fetchAPI } from '../../lib/api';
import Link from 'next/link';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';

const CalendarHome = ({ articles }) => {
  const [date, setDate] = useState('');

  return (
    <Layout>
        {console.log(date)}
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={(date)=> setDate(date)} value={date} label={'MM YYYY'} views={['month', 'year']} />
          </LocalizationProvider>
          
        </div>
      </div>
    </Layout>
  );
};

// export async function getStaticProps() {
//   // Run API calls in parallel
//   const [articlesRes] = await Promise.all([
//     fetchAPI('/articles', { populate: '*', filters: {releaseDate: {$notNull: 'true'}}, publicationState:'live'}),

//   ]);

//   return {
//     props: {
//       articles: articlesRes.data,
//     },
//     revalidate: 1
//   };
// }

export default CalendarHome;
