import Head from 'next/head';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { Analytics } from '@vercel/analytics/react';

import '../styles/fonts.css';
import '../styles/globals.css';
import '../styles/news.css';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NLH7WG6' });
  }, []);

  return (
    <>
      <Head>
        <title>CoViPeL - Computational Vision and Perception Lab</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="theme-color" content="#CCEBD4" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default MyApp;
