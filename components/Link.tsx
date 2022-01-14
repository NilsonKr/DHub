import React from 'react';
import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';

type TProps = { href: string; color: string };

export const NavLink: React.FC<TProps> = ({ href, color, children }) => {
	return (
		<NextLink href={href} passHref>
			<Button variant='ghost' colorScheme={color}>
				{children}
			</Button>
		</NextLink>
	);
};
