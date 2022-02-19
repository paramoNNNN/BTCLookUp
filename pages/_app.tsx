import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>BTC Look Up</title>
				<meta name="description" content="BTC Look Up by hash" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
