import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Index';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>DHub | Welcome!</title>
			</Head>
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</>
	);
}

export default MyApp;
