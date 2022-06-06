import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react';
import { useDebounce } from '../Hooks/useDebounce';
import Image from 'next/image';
import { useWallet } from '@hooks/web3/useWallet';
import { authContext } from '@context/AuthContext'
import { useContract } from '@hooks/web3/useContract';
import { getFile } from '@ipfs/methods/'
//UI
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { FaShareSquare } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { ImExit } from 'react-icons/im'
import { CheckCircleIcon } from '@chakra-ui/icons';
import { GenericBtn, RoundedBtn, UpdateProfilePicModal } from '../components/Index';
import { SubmitEntrance } from '../components/Animations/Common';
import {
	Flex,
	VStack,
	Input,
	InputGroup,
	InputRightElement,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	Box,
	Text,
	Circle,
	useToast,
	Button,
} from '@chakra-ui/react';
//HOC
import InstantAuth from '@components/HOC/InstantAuth'

import { User } from '@roottypes/auth';

type SubmitState = {
	trigger: boolean
	payload: [string, string]
}

const profile = () => {
	const { push } = useRouter()
	const { disconnect } = useWallet()
	const DhubContract = useContract()

	const showToast = useToast({
		variant: 'top-accent',
		title: 'Gallery Copied 🚀',
		description: 'Share it with your friends!',
		status: 'success',
		position: 'bottom',
		duration: 1500,
		isClosable: true,
	});

	const { user, account } = useContext(authContext)
	const [isEdit, setEdit] = useState<boolean>(false);
	const [username, setUsername] = useState<string>(user?.name);
	const [submit, triggerSubmit] = useState<SubmitState>(null);
	const emptyName = username === '';

	useEffect(() => {
		const retriveFile = async () => {
			const file = await getFile('https://bafybeibp7fpxrcwvmwwz5tuanx5vhlbof2pqbcmwldgnrvg273pth2jd3m.ipfs.infura-ipfs.io')
			console.log(file, 'file')
		}

		retriveFile()
	}, [])

	useEffect(() => {
		if (user) setUsername(user.name)
	}, [user])

	useEffect(() => {
		if (submit?.trigger && DhubContract) handleEdit(...submit.payload)
	}, [submit])

	const handleEdit = async (field: string, newValue: string) => {
		try {
			await DhubContract.methods.editUser(field, newValue).send({ from: account })
				.on('transactionHash', () => {
					showToast({
						variant: 'solid',
						title: `Request to edit ${field} was sended`,
						description: 'This may take a few seconds o minutes , we will notify you when the transaction was done',
						status: 'info',
						duration: 4500,
						position: 'top',
					})
				})
				.on('receipt', () => {
					showToast({
						title: `Profile updated!`,
						description: `Your new ${field} was succesfully set up`,
						status: 'success',
						duration: 5000,
						position: 'top',
					})
					setTimeout(() => triggerSubmit({ trigger: false, payload: null }), 1500);
				})

		} catch (error) {
			showToast({
				title: `There was an unexpected error`,
				description: 'Please, try again',
				status: 'error',
				duration: 2500,
				position: 'top',
			})
			triggerSubmit({ trigger: false, payload: null })
			setUsername(user.name)
		}
	}

	const handleSubmit = (field: string, newValue: string, user: User) => {
		if (newValue === user[field] || newValue === '') return

		triggerSubmit({ trigger: true, payload: [field, newValue] });
	}

	const debounce = useCallback(useDebounce((args: [string, string, User]) => handleSubmit(...args), 2000), []);

	const copyGallery = () => {
		navigator.clipboard.writeText('Gallery from DHub!');
		showToast();
	};

	const logout = () => {
		disconnect()
		push('/')
	}

	return (
		<>
			<VStack spacing={55} w='100%' justify='center' px='10' py='10' h='75vh'>
				<Flex w='100%' justify='space-evenly' align='center'>
					<FormControl isInvalid={emptyName} w='250px'>
						<InputGroup>
							<Input
								value={username}
								onChange={ev => {
									const newName = ev.target.value
									setUsername(newName);

									debounce('name', newName, user)
								}}
								borderColor='white'
								fontSize='lg'
								placeholder='Type your username'
								_placeholder={{ color: 'gray.300' }}
								variant='flushed'
								disabled={submit?.trigger}
							/>
							<InputRightElement
								children={
									submit?.trigger && (
										<SubmitEntrance>
											<CheckCircleIcon color='green.400' w='15px' h='15px' />
										</SubmitEntrance>
									)
								}
							/>
						</InputGroup>
						{submit?.trigger && <FormHelperText color='green.400'>Updated!</FormHelperText>}
						{emptyName && (
							<FormErrorMessage>Please, introduce your username</FormErrorMessage>
						)}
					</FormControl>
					<Box
						w='300px'
						h='300px'
						borderRadius='50%'
						position='relative'
						shadow='0px 2px 10px rgba(255, 255, 255, 0.5)'
						role='group'
					>
						{true ? <Image
							className='profilepic'
							layout='fill'
							objectFit='cover'
							src='https://ipfs.infura-ipfs.io/ipfs/bafybeibp7fpxrcwvmwwz5tuanx5vhlbof2pqbcmwldgnrvg273pth2jd3m'
						/> : account && <div className='profilepic' >
							<Jazzicon paperStyles={{ borderRadius: '50%' }} diameter={300} seed={jsNumberForAddress(account)} />
						</div>}
						<Circle
							opacity={0}
							_groupHover={{ opacity: 1 }}
							transition='opacity .1s linear'
							position='absolute'
							top='0'
							w='100%'
							h='100%'
							zIndex={10}
							bg='rgba(255,41,170,.5)'
						>
							<RoundedBtn onClick={() => setEdit(true)} size='80px' bg='rgba(0,0,0,.85)'>
								<MdEdit size='40px' color='white' />
							</RoundedBtn>
						</Circle>
					</Box>
				</Flex>
				<Flex w="100%" justify="space-between" align="center" mt="10">
					<GenericBtn
						hoverColor=''
						leftIcon={<FaShareSquare size='23px' color='white' />}
						bg='linear-gradient(90deg, #7D5FC0 0%, #4D00FF 100%)'
						handleClick={copyGallery}
						fontSize='xl'
						p='6'
						fontWeight='semibold'
						h='50px'
						borderRadius='25px'
					>
						Share Gallery
					</GenericBtn>
					<Button
						role='group'
						_hover={{
							padding: '1.5rem',
							width: '180px'
						}}
						leftIcon={<ImExit size='23px' color='white' style={{ margin: 0 }} />}
						onClick={logout}
						bg='red.500'
						h='50px'
						w='50px'
						overflow='hidden'
						borderRadius='25px'
						transition='width .4s ease'
					>
						<Text
							position='absolute'
							fontSize="xl"
							fontWeight='semibold'
							transform='translateX(100px)'
							opacity='0'
							transition='transform .4s linear'
							_groupHover={{
								position: 'static',
								transform: 'translateX(0)',
								opacity: '1'
							}}
						>
							Disconnect
						</Text>
					</Button>
				</Flex>
			</VStack>
			{isEdit && <UpdateProfilePicModal close={() => setEdit(false)} />}
		</>
	);
};

export default InstantAuth(profile);
