import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Button, Text } from '@chakra-ui/react';

type TProps = { isAuth: boolean, href: string; color?: string };

export const NavLink: React.FC<TProps> = ({ isAuth, href, children }) => {
	const { route } = useRouter();

	return (
		<NextLink href={href} passHref>
			<Button
				_hover={{ background: '#FF0099' }}
				role='group'
				padding='25px 20px'
				borderRadius='25px'
				variant='ghost'
			>
				<Text
					fontSize='2xl'
					borderBottomWidth='1px'
					borderBottomColor={isAuth ? (route === href ? 'white' : 'transparent') : 'transparent'}
					_groupHover={{ borderColor: 'transparent' }}
				>
					{children}
				</Text>
			</Button>
		</NextLink>
	);
};
