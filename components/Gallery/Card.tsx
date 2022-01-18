import React from 'react';
import Image from 'next/image';
//UI
import { Box, Text, Heading } from '@chakra-ui/react';

export const Card = () => {
	return (
		<Box
			w='100%'
			h='100%'
			position='relative'
			shadow='0px 4px 8px rgba(255, 255, 255, 0.2)'
			borderRadius='5px'
			overflow='hidden'
			transition='box-shadow .2s linear'
			_hover={{
				shadow: '0px 4px 8px rgba(255, 255, 255, 0.6)',
			}}
		>
			<Box
				position='absolute'
				h='100%'
				w='100%'
				zIndex='2'
				bg='linear-gradient(180deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0) 40%)'
				_hover={{
					bg: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(246,246,246,0) 50%, rgba(0,0,0,0.7) 100%)',
				}}
			>
				<Box ml={4} mt={3}>
					<Heading mb={1} fontSize='md'>
						Random paper doge
					</Heading>
					<Text color='gray.300' fontSize='sm' fontWeight='semibold'>
						Chiilest and coolest dog I ever...
					</Text>
				</Box>
			</Box>
			<Image
				layout='fill'
				objectFit='cover'
				src='/assets/exampleImg.jpg'
				placeholder='blur'
				blurDataURL='/assets/exampleImg.jpg'
			/>
		</Box>
	);
};
