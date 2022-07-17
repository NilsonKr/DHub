import { useState } from 'react';
import { useItemDetail } from '@hooks/web3/useItemDetail'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useWallet } from '@hooks/web3/useWallet';
//UI
import { QrCodeIcon } from '../../components/Icons';
import {
	RoundedBtn,
	CreateTagModal,
	GenericBtn,
	TransferModal,
	QRCodeModal,
} from '../../components/Index';
import { ItemTags as ItemTagsModal } from '@components/Modal/ItemTags';
import { ItemTagsRow } from '@components/Miscellaneous/';
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
import { PageSkeleton } from '@components/Detail/PageSkeleton'
//HOC
import TagsWrapper from '@components/HOC/TagsWrapper';
import InstantAuth from '@components/HOC/InstantAuth';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	//This is necessary due metamaks didnt connect automatically due to unknown next's deal with dynamic routes
	return {
		props: {},
	}
}

const detail = () => {
	const { query } = useRouter()
	const { account } = useWallet()
	const { item, isLoading } = useItemDetail(query.id as string, account)
	const [modal, setModal] = useState<string>('');

	return (isLoading || !item) ? <PageSkeleton /> : (
		<>
			<VStack spacing={5} h='70vh' mt='50px' w='100%' justify='center' px='10' pb='10'>
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
								<RoundedBtn
									bg='purple.500'
									size='40px'
									onClick={() => setModal('qrcode')}
								>
									<QrCodeIcon size='20px' color='white' />
								</RoundedBtn>
								<RoundedBtn bg='purple.500' size='40px'>
									<BiLink color='white' size='25px' />
								</RoundedBtn>
							</HStack>
							<Divider orientation='horizontal' w='100%' bg='white' />
						</Box>
						<Heading>{item.title}</Heading>
						<VStack spacing={4} align='start'>
							<Flex align='center'>
								<Text>Owner : </Text>
								<Badge ml='3' bg='gray.700' p='1' borderRadius='5px'>
									{account}
								</Badge>
							</Flex>
							<Flex align='center'>
								<Text>Size : </Text>
								<Badge ml='3' bg='gray.700' p='1' borderRadius='5px'>
									{(item.size)} KB
								</Badge>
							</Flex>
							<Flex align='center'>
								<Text>Upload Date : </Text>
								<Badge ml='3' bg='gray.700' p='1' borderRadius='5px'>
									{new Date(item.uploadDate).toLocaleDateString()}
								</Badge>
							</Flex>
						</VStack>
					</VStack>
				</Flex>
				<ItemTagsRow account={account} id={Number(item.id)} background='gray.900' addIcon linkTag={() => setModal('add_tag')} />
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
			{/* <CreateTagModal account={account} open={modal === 'new_tag'} close={() => setModal('')} /> */}
			<TransferModal open={modal === 'transfer'} close={() => setModal('')} />
			<QRCodeModal open={modal === 'qrcode'} close={() => setModal('')} />
		</>
	);
};

export default InstantAuth(TagsWrapper(detail));