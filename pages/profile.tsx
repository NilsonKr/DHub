import { useState } from 'react';
import Image from 'next/image';
//UI
import { FaShareSquare } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { GenericBtn, RoundedBtn, UpdateProfilePicModal } from '../components/Index';
import {
	Flex,
	VStack,
	Input,
	FormControl,
	FormErrorMessage,
	Box,
	Square,
	Circle,
} from '@chakra-ui/react';

const profile = () => {
	const [isEdit, setEdit] = useState<boolean>(false);
	const [username, setUsername] = useState<string>('NilsonKr');

	const emptyName = username === '';

	return (
		<>
			<VStack spacing={55} w='100%' justify='center' px='10' py='10' h='75vh'>
				<Flex w='100%' justify='space-evenly' align='center'>
					<FormControl isInvalid={emptyName} w='250px'>
						<Input
							value={username}
							onChange={ev => setUsername(ev.target.value)}
							borderColor='white'
							fontSize='lg'
							placeholder='Type your username'
							_placeholder={{ color: 'gray.300' }}
							variant='flushed'
						/>
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
				<Square>
					<GenericBtn
						hoverColor=''
						leftIcon={<FaShareSquare size='23px' color='white' />}
						bg='linear-gradient(90deg, #7D5FC0 0%, #4D00FF 100%)'
						handleClick={() => {}}
						fontSize='xl'
						p='7'
						fontWeight='semibold'
						h='50px'
						borderRadius='25px'
					>
						Share Gallery
					</GenericBtn>
				</Square>
			</VStack>
			{isEdit && <UpdateProfilePicModal close={() => setEdit(false)} />}
		</>
	);
};

export default profile;
