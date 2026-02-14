import Head from 'next/head';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { Auth0Provider } from '@auth0/auth0-react';

import '../styles/fonts.css';
import '../styles/globals.css';
import '../styles/news.css';

const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
const authClient = process.env.NEXT_PUBLIC_AUTH_CLIENT;

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NLH7WG6' });
  }, []);

  return (
    <Auth0Provider
      domain={authDomain}
      clientId={authClient}
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' && `${window.location.origin}/callback`,
        scope: '', // auth0 uses the union of scopes provided here and in login request
      }}
    >
      <Head>
        <title>CoViPeL - Computational Vision and Perception Lab</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="theme-color" content="#CCEBD4" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Auth0Provider>
  );
};

export default MyApp;
