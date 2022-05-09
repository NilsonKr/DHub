import { useRouter } from 'next/router'
import { useState } from 'react';
import { useDebounce } from '../Hooks/useDebounce';
import Image from 'next/image';
import { useWallet } from '@hooks/web3/useWallet';
//UI
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
	Button
} from '@chakra-ui/react';

const profile = () => {
	const { push } = useRouter()
	const { disconnect } = useWallet()
	const showToast = useToast({
		variant: 'top-accent',
		title: 'Gallery Copied 🚀',
		description: 'Share it with your friends!',
		status: 'success',
		position: 'bottom',
		duration: 1500,
		isClosable: true,
	});

	const [isEdit, setEdit] = useState<boolean>(false);
	const [username, setUsername] = useState<string>('NilsonKr');
	const [submit, triggerSubmit] = useState<boolean>(false);
	const emptyName = username === '';

	const handleSubmit = () => {
		triggerSubmit(true);
		setTimeout(() => triggerSubmit(false), 2500);
	};

	const debounce = useDebounce(handleSubmit, 1000);

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
									setUsername(ev.target.value);
									if (ev.target.value !== '') debounce();
								}}
								borderColor='white'
								fontSize='lg'
								placeholder='Type your username'
								_placeholder={{ color: 'gray.300' }}
								variant='flushed'
							/>
							<InputRightElement
								children={
									submit && (
										<SubmitEntrance>
											<CheckCircleIcon color='green.400' w='15px' h='15px' />
										</SubmitEntrance>
									)
								}
							/>
						</InputGroup>
						{submit && <FormHelperText color='green.400'>Updated!</FormHelperText>}
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
						<Image
							className='profilepic'
							layout='fill'
							objectFit='cover'
							src='/assets/MyNft.png'
							placeholder='blur'
							blurDataURL='/assets/MyNft.png'
						/>
						<Circle
							opacity={0}
							_groupHover={{ opacity: 1 }}
							transition='opacity .1s linear'
							position='absolute'
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

export default profile;
