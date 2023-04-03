import App from 'next/app';
import Head from 'next/head';
import '../assets/css/style.css';
import { createContext } from 'react';
import { fetchAPI } from '../lib/api';
import { getStrapiMedia } from '../lib/media';
import {useStoredTheme }from '../util/localStorage.js'
// Store Strapi Global object in context
export const GlobalContext = createContext({});
import '../styles/globals.css';
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '../util/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '@/components/Footer';

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;
let storedTheme
if(typeof window !== 'undefined'){
  storedTheme = localStorage.getItem('theme')
  if(!storedTheme){
    localStorage.setItem('theme',JSON.stringify('dark'))
  }
}
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>

      <GlobalContext.Provider value={global.attributes}>

          <CssBaseline />
          <Component {...pageProps} />

      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI('/global', {
    populate: {
      favicon: '*',
      defaultSeo: {
        populate: '*',
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
