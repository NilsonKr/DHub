import { useState } from 'react';
import Image from 'next/image';
//UI
import { QrCodeIcon } from '../components/Icons';
import {
	RoundedBtn,
	CreateTagModal,
	GenericBtn,
	TagsList,
	TransferModal,
} from '../components/Index';
import { BiLink } from 'react-icons/bi';
import { ImCloudDownload } from 'react-icons/im';
import { IoIosSend } from 'react-icons/io';
import {
	VStack,
	HStack,
	Flex,
	Box,
	Heading,
	Text,
	Badge,
	Divider,
} from '@chakra-ui/react';

const detail = () => {
	const [modal, setModal] = useState<string>('');

	return (
		<>
			<VStack spacing={3} h='70vh' mt='50px' w='100%' justify='center' px='10' pb='10'>
				<Flex justify='start' w='100%'>
					<Box
						w='280px'
						h='280px'
						position='relative'
						shadow='0px 2px 10px rgba(255, 255, 255, 0.3)'
						mr='12'
					>
						<Image
							layout='fill'
							objectFit='cover'
							src='/assets/exampleImg.jpg'
							placeholder='blur'
							blurDataURL='/assets/exampleImg.jpg'
						/>
					</Box>
					<VStack w='65%' align='start' spacing={5}>
						<Box w='100%'>
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
						</Box>
						<Heading>MyImage.jpg</Heading>
						<VStack spacing={4} align='start'>
							<Flex align='center'>
								<Text>Owner : </Text>
								<Badge ml='3' bg='gray.700' p='1' borderRadius='5px'>
									0x91F1838CC5F17666112E5302C19377cB9e99ccA0
								</Badge>
							</Flex>
							<Flex align='center'>
								<Text>Size : </Text>
								<Badge ml='3' bg='gray.700' p='1' borderRadius='5px'>
									82.6 KB
								</Badge>
							</Flex>
							<Flex align='center'>
								<Text>Upload Date : </Text>
								<Badge ml='3' bg='gray.700' p='1' borderRadius='5px'>
									Sat 29 Jan 9:57 PM
								</Badge>
							</Flex>
						</VStack>
					</VStack>
				</Flex>
				<TagsList newTag={() => setModal('new_tag')} />
				<HStack justify='start' spacing={3} w='100%'>
					<RoundedBtn size='50px' bg='purple.500'>
						<ImCloudDownload color='white' size='30px' />
					</RoundedBtn>
					<GenericBtn
						hoverColor=''
						rightIcon={<IoIosSend size='30px' color='white' />}
						bg='linear-gradient(90deg, rgba(255, 0, 184, 0.62) 1.1%, #3E02C9 98.9%)'
						handleClick={() => setModal('transfer')}
						fontSize='2xl'
						fontWeight='semibold'
						h='50px'
						borderRadius='10px'
					>
						TRANSFER
					</GenericBtn>
				</HStack>
			</VStack>
			<CreateTagModal open={modal === 'new_tag'} close={() => setModal('')} />
			<TransferModal open={modal === 'transfer'} close={() => setModal('')} />
		</>
	);
};

export default detail;
