import NextLink from 'next/link';
//UI
import { LogoIcon } from './Icons';
import { NavLink } from './Link';
import { Grid, GridItem, Box, Flex, Heading, Avatar } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

export const Header = () => {
	return (
		<Grid mt='12' templateColumns='1fr 3fr 1fr' gap={8} h='18' alignItems='center'>
			<GridItem w='100%'>
				<Heading>
					<LogoIcon />
				</Heading>
			</GridItem>
			<GridItem w='100%'>
				<Flex justifyContent='space-around'>
					<NavLink href='/' color='blue'>
						Home
					</NavLink>
					<NavLink href='/gallery' color='green'>
						Gallery
					</NavLink>
					<NavLink href='/profile' color='pink'>
						Profile
					</NavLink>
				</Flex>
			</GridItem>
			<GridItem w='100%'>
				<Box mx='auto' w='min'>
					<Avatar
						bg='purple.700'
						cursor='pointer'
						_hover={{ bg: 'purple.500' }}
						_active={{ transform: 'scale(0.9)' }}
						icon={<AiOutlineUser size='30px' color='white' />}
					/>
				</Box>
			</GridItem>
		</Grid>
	);
};
