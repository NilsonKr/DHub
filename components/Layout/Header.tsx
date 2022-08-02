import { useContext } from 'react'
import { authContext } from '@context/AuthContext'
import NextLink from 'next/link';
//UI
import { LogoIcon } from '../Icons';
import { NavLink } from './Link';
import { Grid, GridItem, Box, Flex, Heading, Avatar } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

export const Header = () => {
	const { isAuth } = useContext(authContext)

	return (
		<Grid mt='12' templateColumns='1fr 3fr 1fr' gap={8} alignItems='center'>
			<GridItem w='100%'>
				<NextLink href='/'>
					<Heading cursor='pointer'>
						<LogoIcon />
					</Heading>
				</NextLink>
			</GridItem>
			<GridItem w='100%'>
				<Flex justifyContent='space-around'>
					<NavLink isAuth={isAuth} href='/' color='blue'>
						Home
					</NavLink>
					<NavLink isAuth={isAuth} href={isAuth ? '/gallery' : '/'} color='green'>
						Gallery
					</NavLink>
					<NavLink isAuth={isAuth} href={isAuth ? '/profile' : '/'} color='pink'>
						Profile
					</NavLink>
				</Flex>
			</GridItem>
			<GridItem w='100%'>
				<NextLink href={isAuth ? '/profile' : '/'}>
					<Box mx='auto' w='min'>
						<Avatar
							bg='pink.700'
							cursor='pointer'
							_hover={{ bg: 'pink.500' }}
							_active={{ transform: 'scale(0.9)' }}
							icon={<AiOutlineUser size='30px' color='white' />}
						/>
					</Box>
				</NextLink>
			</GridItem>
		</Grid>
	);
};
