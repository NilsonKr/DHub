import React from 'react';
import Image from 'next/image';
//UI
import { QrCodeIcon } from '../components/Icons';
import { RoundedBtn } from '../components/Index';
import { BiLink } from 'react-icons/bi';
import { VStack, HStack, Flex, Box, Heading, Circle, Divider } from '@chakra-ui/react';

const detail = () => {
	return (
		<VStack h='70vh' mt='50px' w='100%' justify='center' px='10'>
			<Flex>
				<Box
					w='250px'
					h='250px'
					position='relative'
					shadow='0px 2px 10px rgba(255, 255, 255, 0.3)'
					mr='10'
				>
					<Image
						layout='fill'
						objectFit='cover'
						src='/assets/exampleImg.jpg'
						placeholder='blur'
						blurDataURL='/assets/exampleImg.jpg'
					/>
				</Box>
				<VStack>
					<HStack p='10px 5px' align='center' spacing={5}>
						<Heading fontWeight='semibold' fontSize='2xl'>
							Share
						</Heading>
						<RoundedBtn bg='purple.500' size='40px'>
							<QrCodeIcon size='20px' color='white' />
						</RoundedBtn>
						<RoundedBtn bg='purple.500' size='40px'>
							<BiLink color='white' size='25px' />
						</RoundedBtn>
					</HStack>
					<Divider orientation='horizontal' w='100%' bg='white' />
				</VStack>
			</Flex>
		</VStack>
	);
};

export default detail;
