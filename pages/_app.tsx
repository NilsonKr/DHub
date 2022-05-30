import { useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
//App
import { theme } from '../styles/theme';
import { getLibrary } from '../config/web3'
//Components
import { Layout } from '../components/Index';
import { ChakraProvider } from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core'
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
