import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Button, Text } from '@chakra-ui/react';

type TProps = { href: string; color: string };

export const NavLink: React.FC<TProps> = ({ href, color, children }) => {
	const { route } = useRouter();

	return (
		<NextLink href={href} passHref>
			<Button
				_hover={{ background: `${color}.600` }}
				padding='25px 20px'
				borderRadius='25px'
				variant='ghost'
				colorScheme={color}
			>
				<Text
					fontSize='2xl'
					borderBottomWidth='1px'
					borderBottomColor={route === href ? `${color}.400` : 'transparent'}
				>
					{children}
				</Text>
			</Button>
		</NextLink>
	);
};
