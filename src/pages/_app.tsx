import { AppProps } from 'next/app';
import Router from 'next/router';
import { SessionProvider } from 'next-auth/react';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    Router.events.on('routeChangeStart', (_) => {
      NProgress.start();
    });

    Router.events.on('routeChangeError', (_) => {
      NProgress.done(false);
    });

    Router.events.on('routeChangeComplete', (_) => {
      NProgress.done(false);
    });
  });
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
