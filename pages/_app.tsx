import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { createClient } from 'utils/queryClient';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = createClient();
  return (
    <>
      <Head>
        <title>BTC Look Up</title>
        <meta name="description" content="BTC Look Up by hash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <Toaster
        toastOptions={{
          position: 'top-right',
          duration: 5000,
        }}
      />
    </>
  );
}

export default MyApp;
