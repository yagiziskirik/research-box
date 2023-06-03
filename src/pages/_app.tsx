import { AppProps } from 'next/app';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
// import '@/styles/colors.css';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import Router from 'next/router';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

NProgress.configure({ showSpinner: false });

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      NProgress.start();
    });

    Router.events.on('routeChangeError', (url) => {
      NProgress.done(false);
    });

    Router.events.on('routeChangeComplete', (url) => {
      NProgress.done(false);
    });
  }, [Router]);
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <ToastContainer />
      </SessionProvider>
    </>
  );
}

export default MyApp;
