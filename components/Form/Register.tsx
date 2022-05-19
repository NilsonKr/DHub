import React, { useContext } from 'react';
import { authContext } from '@context/AuthContext'
//UI
import {
	InputGroup,
	InputRightElement,
	Input,
	Button,
	Heading,
	VStack,
	Icon,
} from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';
//HOC
import { ConnectAnimation } from '@components/HOC/ConnectAnimation'

type ComponenetProps = {
	msg: string
}

export const Register: React.FC<ComponenetProps> = ConnectAnimation(({ msg }) => {
	const { register } = useContext(authContext)

	return (
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
				onClick={() => { }}
			>
				Create account
			</Button>
		</VStack>
	);
});
