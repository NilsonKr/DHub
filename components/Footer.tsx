import React from 'react';
//UI
import { Divider, Text, Link, HStack, Flex, Icon } from '@chakra-ui/react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
	return (
		<>
			<Divider orientation='horizontal' bg='white' h='2px'></Divider>
			<Flex justify='space-between' align='center' p='4'>
				<Text>
					Designed and develop with 💜 by{' '}
					<Link href='https://github.com/NilsonKr' target='_blank' color='purple.300'>
						NilsonKr
					</Link>
				</Text>
				<HStack spacing='4'>
					<Link target='_blank' href='https://github.com/NilsonKr/DMedia'>
						<Icon
							as={FaGithub}
							color='white'
							w='25px'
							h='25px'
							cursor='pointer'
							_hover={{ color: 'purple.300' }}
						/>
					</Link>
					<Link target='_blank' href='https://twitter.com/Nilson_Kr'>
						<Icon
							as={FaTwitter}
							color='white'
							w='25px'
							h='25px'
							cursor='pointer'
							_hover={{ color: 'purple.300' }}
						/>
					</Link>
				</HStack>
			</Flex>
		</>
	);
};
