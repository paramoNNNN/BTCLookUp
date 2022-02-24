import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { Provider as SupabaseProvider } from 'react-supabase';
import { supabase } from 'api/utils/supabase';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>BTC Look Up</title>
        <meta name="description" content="BTC Look Up by hash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SupabaseProvider value={supabase}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SupabaseProvider>
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
