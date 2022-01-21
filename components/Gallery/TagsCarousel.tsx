import React from 'react';
//UI
import { Square, HStack, Icon, Text } from '@chakra-ui/react';
import { BsFillTagsFill } from 'react-icons/bs';

const tagsList = [
	'Background',
	'Images',
	'Photos',
	'Landscape',
	'Work',
	'study',
	'hobbies',
	'Photos',
	'Landscape',
	'Work',
	'study',
	'hobbies',
];

export const TagsCarousel = () => {
	return (
		<HStack w='100%' my='3' pb='5' pt='2' spacing={4} overflowY='auto' overflowX='scroll'>
			{tagsList.map((tag, i) => (
				<Square
					_hover={{ bg: 'pink.800' }}
					cursor='pointer'
					_active={{ transform: 'translateY(-5px)', bg: 'pink.300' }}
					transition='transform .03s linear'
					bg='#FF0099'
					justifyContent='space-around'
					borderRadius='10px'
					p='3px 8px'
					key={i}
				>
					<Icon color='black' mr='2' as={BsFillTagsFill} />
					<Text color='white' fontSize='sm'>
						{tag}
					</Text>
				</Square>
			))}
		</HStack>
	);
};
