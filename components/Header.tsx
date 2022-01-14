import NextLink from 'next/link';
//UI
import { NavLink } from './Link';
import { Grid, GridItem, Text, Flex, Heading, Avatar } from '@chakra-ui/react';

export const Header = () => {
	return (
		<Grid mt='12' templateColumns='1fr 3fr 1fr' gap={8} h='18' alignItems='center'>
			<GridItem w='100%'>
				<Heading>DMedia</Heading>
			</GridItem>
			<GridItem w='100%'>
				<Flex justifyContent='space-around'>
					<NavLink href='/' color='blue'>
						<Text fontSize='2xl'>Home</Text>
					</NavLink>
					<NavLink href='/' color='red'>
						<Text fontSize='2xl'>Gallery</Text>
					</NavLink>
					<NavLink href='/' color='yellow'>
						<Text fontSize='2xl'>Profile</Text>
					</NavLink>
				</Flex>
			</GridItem>
			<GridItem w='100%'>
				<Avatar bg='purple.600' mx='auto' display='block' />
			</GridItem>
		</Grid>
	);
};
