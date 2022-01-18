import type { NextPage } from 'next';
//UI
import { Container } from '@chakra-ui/react';
import { Header, Footer, HomeMain } from '../components/Index';
import { Box } from '@chakra-ui/react';
import { BgLeftAdornment, BgRightAdornment } from '../components/Icons/';

const Home: NextPage = () => {
	return (
		<>
			<Box position='absolute' top='0px' left='10px' zIndex='-1'>
				<BgLeftAdornment />
			</Box>
			<Box position='absolute' bottom='0px' right='0px' zIndex='-1'>
				<BgRightAdornment />
			</Box>
			<HomeMain />
			{/* <Text color={theme?.colors.purple100.value}>Home view</Text> */}
		</>
	);
};

export default Home;
