import React from 'react';
//UI
import { motion, Variants } from 'framer-motion';
import {
	InputGroup,
	InputRightElement,
	Input,
	Button,
	Heading,
	Box,
	VStack,
	Icon,
} from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';

const variants: Variants = {
	hidden: {
		opacity: 0,
		translateY: '50px',
	},
	entrance: {
		opacity: 1,
		translateY: '0px',
		transition: {
			delay: 0.5,
			duration: 1,
		},
	},
};

export const Register = () => {
	return (
		<Box
			position='absolute'
			top='40px'
			left='50%'
			transform='translateX(-50%)'
			minW='65%'
			zIndex='1'
		>
			<motion.div variants={variants} animate='entrance' initial='hidden'>
				<VStack spacing={5} align='center'>
					<Heading>Welcome! Please set your name✨</Heading>
					<InputGroup
						w='75%'
						m='0 auto'
						borderColor='transparent'
						borderBottom='1px solid white'
					>
						<Input
							_focus={{ borderColor: 'transparent' }}
							border='none'
							placeholder='Type your username'
							_placeholder={{ color: 'gray.400' }}
						/>
						<InputRightElement>
							<Icon
								color='purple.500'
								cursor='pointer'
								h='22px'
								w='25px'
								_hover={{ color: 'purple.300' }}
								as={IoMdSend}
							/>
						</InputRightElement>
					</InputGroup>
					<Button
						_hover={{ bg: 'purple.400' }}
						_active={{ bg: 'purple.800', transform: 'scale(0.95)' }}
						bg='purple.600'
						px='25px'
						py='20px'
						borderRadius='25px'
						fontSize='1xl'
						onClick={() => {}}
					>
						Create account
					</Button>
				</VStack>
			</motion.div>
		</Box>
	);
};
