import React, { useState, useContext } from 'react';
import { authContext } from '@context/AuthContext'
import { useForm } from '@hooks/useForm'
//UI
import {
	InputGroup,
	InputRightElement,
	Input,
	Button,
	Heading,
	VStack,
	Icon,
	Alert,
	AlertIcon,
	AlertTitle,
	Spinner,
	useToast,
	FormControl,
} from '@chakra-ui/react';
//HOC
import { ConnectAnimation } from '@components/HOC/ConnectAnimation'

type ComponenetProps = {
	msg: string
}

export const Register: React.FC<ComponenetProps> = ConnectAnimation(({ msg }) => {
	const { register, login } = useContext(authContext)
	const toast = useToast()
	const { form, handleChange } = useForm({ name: '' })
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>(null)

	const handleRegister = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()

		setIsLoading(true)
		toast({
			title: 'Please wait until confirmation',
			description: 'This process could take a couple of minutes once you sign the transaction, Thanks!',
			variant: 'solid',
			position: 'top-left',
			isClosable: true,
			duration: 15000,
		})
		const result = await register(form.name as string)

		if (result.error) {
			setError(result.error)
		} else {
			await login()
		}

		setIsLoading(false)
	}

	return (
		<VStack spacing={5} align='center' position='relative'>
			{(msg || error) && <Alert status={error ? 'error' : 'warning'} position='absolute' top='-40px'>
				<AlertIcon />
				<AlertTitle>{error ? error : msg}</AlertTitle>
			</Alert>}

			<Heading>Welcome! Please set your name✨</Heading>
			<form onSubmit={handleRegister} style={{ width: '75%', margin: '0 auto' }}>
				<FormControl isInvalid={!!error} mt='4' display='flex' flexDirection='column' alignItems='center' gap='4'>
					<InputGroup
						borderColor='transparent'
						borderBottom={`1px solid ${error ? '#ff4d6c' : 'white'}`}
					>
						<Input
							_invalid={{
								borderColor: 'transparent',
							}}
							_focus={{ borderColor: 'transparent' }}
							border='none'
							placeholder='Type your username'
							_placeholder={{ color: 'gray.400' }}
							value={form.name}
							onChange={(ev) => handleChange('name', ev.target.value)}
						/>
						{isLoading && <InputRightElement p='2' >
							<Spinner size='md' color='purple.500' />
						</InputRightElement>}
					</InputGroup>
					<Button
						type='submit'
						_hover={{ bg: 'purple.400' }}
						_active={{ bg: 'purple.800', transform: 'scale(0.95)' }}
						bg='purple.600'
						px='25px'
						py='20px'
						minW='200px'
						borderRadius='25px'
						fontSize='1xl'
						disabled={form.name === ''}
					>
						{isLoading ? <Spinner size='md' color='white' /> : 'Create account'}
					</Button>
				</FormControl>
			</form>
		</VStack>
	);
});
