import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, NextUIProvider, createTheme } from '@nextui-org/react';

const theme = createTheme({ type: 'dark' });

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NextUIProvider theme={theme}>
			<CssBaseline />
			<Component {...pageProps} />
		</NextUIProvider>
	);
}

export default MyApp;
