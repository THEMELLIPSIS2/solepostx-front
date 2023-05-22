import App from 'next/app';
import Head from 'next/head';
import { createContext, useContext } from 'react';
import { fetchAPI } from '../lib/api';
import { getStrapiMedia } from '../lib/media';
// Store Strapi Global object in context
export const GlobalContext = createContext({});
import '../styles/globals.css';
import CookieAccept from './cookies';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import * as ga from '../lib/ga';
import CookieConsent, {
  Cookies,
  getCookieConsentValue
} from 'react-cookie-consent';

import Script from 'next/script';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

const [consent,setConsent] = useState(getCookieConsentValue('localConsent'))


  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const { global } = pageProps;
  let storedTheme;
  if (typeof window !== 'undefined') {
    storedTheme = localStorage.getItem('theme');
    if (!storedTheme) {
      localStorage.setItem('theme', JSON.stringify('dark'));
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

      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',

            });
            
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','${process.env.GTM_ID}');`
        }}
      />    
       {
       
       consent && ( 
        <Script
       
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            gtag('consent', 'update', {
              'ad_storage': 'granted',
              'analytics_storage': 'granted'
            });
          `
          }}
        />
      )}

      <GlobalContext.Provider value={global.attributes}>
        <CookieAccept />
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
};
export function useAppContext() {
  return useContext(GlobalContext);
}

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
        populate: '*'
      },
      Socials: { populate: '*' }
    }
  });

  const allCategories = await fetchAPI('/categories', {
    filters: { isBrand: { $eq: 'true' } }
  });
  globalRes.data.attributes['categories'] = allCategories.data;
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
