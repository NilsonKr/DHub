import type { NextPage } from 'next';
//UI
import { useTheme, Container, Text } from '@nextui-org/react';
import { Header } from '../components/Index';

const Home: NextPage = () => {
	const { theme } = useTheme();

	return (
		<Container>
			<Header />
			{/* <Text color={theme?.colors.purple100.value}>Home view</Text> */}
		</Container>
	);
};

export default Home;
