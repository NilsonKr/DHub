import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Index';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '../config/web3'
import { AuthContext } from '@context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>DHub | Welcome!</title>
			</Head>
			<Web3ReactProvider getLibrary={getLibrary}>
				<ChakraProvider theme={theme}>
					<AuthContext>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</AuthContext>
				</ChakraProvider>
			</Web3ReactProvider>
		</>
	);
}

export default MyApp;
