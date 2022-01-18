import React from 'react';
//Components
import { Container } from '@chakra-ui/react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout: React.FunctionComponent = ({ children }) => {
	return (
		<Container maxW='1000px'>
			<Header />
			{children}
			<Footer />
		</Container>
	);
};
