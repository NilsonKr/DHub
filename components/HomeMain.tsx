import React from 'react';
import Image from 'next/image';
//UI
import { BgBubble } from './BgBubble';
import { VStack, Heading, Text, Button } from '@chakra-ui/react';

export const HomeMain = () => {
	return (
		<VStack
			spacing={3}
			minH='100vh'
			my='10'
			justify='center'
			align='center'
			textAlign='center'
			position='relative'
		>
			<BgBubble />
			<Image
				src='/assets/box.png'
				blurDataURL='/assets/box.png'
				alt='Descentralized box'
				width='250px'
				height='250px'
				placeholder='blur'
			/>
			<Heading>Your own descentralized storage</Heading>
			<Text>Get start by sign in</Text>
			<Button
				_hover={{ bg: 'purple.400' }}
				_active={{ bg: 'purple.800', transform: 'scale(0.95)' }}
				bg='purple.600'
				px='30px'
				py='25px'
				borderRadius='25px'
				fontSize='2xl'
			>
				Connect wallet
			</Button>
		</VStack>
	);
};
