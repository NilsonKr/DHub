import React from 'react';
//Components
import { Container, Box } from '@chakra-ui/react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BgLeftAdornment, BgRightAdornment } from '@components/Icons';

export const Layout: React.FunctionComponent = ({ children }) => {
	return (
		<Container maxW='1000px'>
			<Box position='absolute' top='0px' left='10px' zIndex='-1'>
				<BgLeftAdornment />
			</Box>
			<Box position='absolute' bottom='0px' right='0px' zIndex='-1'>
				<BgRightAdornment />
			</Box>
			<Header />
			{children}
			<Footer />
		</Container>
	);
};
