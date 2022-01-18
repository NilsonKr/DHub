import React from 'react';
//UI
import { motion, Variants } from 'framer-motion';
import { Heading, Text, Box, VStack, HStack } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const variants: Variants = {
	hidden: {
		opacity: 0,
		translateY: '50px',
	},
	entrance: {
		opacity: 1,
		translateY: '0px',
		transition: {
			delay: 0.6,
			duration: 1,
		},
	},
};

export const LoggedIn = () => {
	return (
		<Box
			position='absolute'
			top='100px'
			left='50%'
			transform='translateX(-50%)'
			minW='65%'
			zIndex='1'
		>
			<motion.div variants={variants} animate='entrance' initial='hidden'>
				<VStack spacing={5}>
					<Heading>Welcome back NilsonKr! 🎉</Heading>
					<HStack spacing={4} align='center'>
						<CheckCircleIcon color='green.300' w='40px' h='40px' />
						<Text fontSize='lg'>Logged In</Text>
					</HStack>
				</VStack>
			</motion.div>
		</Box>
	);
};
