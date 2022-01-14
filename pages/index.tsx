import type { NextPage } from 'next';
//UI
import { Header } from '../components/Index';
import { Container } from '@chakra-ui/react';

const Home: NextPage = () => {
	return (
		<Container maxW='1000px'>
			<Header />
			{/* <Text color={theme?.colors.purple100.value}>Home view</Text> */}
		</Container>
	);
};

export default Home;
