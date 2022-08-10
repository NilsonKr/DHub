import { useState, useRef } from 'react';
import { useItemDetail } from '@hooks/web3/useItemDetail'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useWallet } from '@hooks/web3/useWallet';
//UI
import { Bounce as BounceAnimation } from '@components/Animations/Common'
import { QrCodeIcon } from '../../components/Icons';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {
	RoundedBtn,
	CreateTagModal,
	GenericBtn,
	TransferModal,
	QRCodeModal,
} from '../../components/Index';
import { ItemTagsRow } from '@components/Miscellaneous/';
import { BiLink, BiTrash } from 'react-icons/bi';
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
	Highlight,
} from '@chakra-ui/react';
import { PageSkeleton } from '@components/Detail/PageSkeleton'
import { DeleteModal } from '@components/Modal'
import { ItemTags as ItemTagsModal } from '@components/Modal/ItemTags';
//HOC
import TagsWrapper from '@components/HOC/TagsWrapper';
import InstantAuth from '@components/HOC/InstantAuth';
//Utils
import { handleDownload } from '@utils/Item'

export async function getServerSideProps(context: GetServerSidePropsContext) {
	//This is necessary due metamaks didnt connect automatically due to unknown next's deal with dynamic routes
	return {
		props: {},
	}
}

const detail = () => {
	const { query } = useRouter()
	const { account } = useWallet()

	const { item, isLoading, deleteItem, transferItem } = useItemDetail(query.id as string, account)
	const downloadRef = useRef<HTMLAnchorElement>(null)
	const [modal, setModal] = useState<string>('');
	const [isCopied, setCopy] = useState<boolean>(false)

	const shareUrl = `${window.location.href}?share=${account}`

	const copy = () => {
		navigator.clipboard.writeText(shareUrl)
		setCopy(true)
	}

	const download = () => {
		handleDownload(downloadRef, item.url, item.title)
	}

	const isShared = query?.share

	return <>{(isLoading || !item) ? <PageSkeleton /> : (
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
							src={item.url}
						/>
					</Box>
					<VStack w='65%' align='start' spacing={5}>
						<Box w='100%'>
							<Flex justifyContent='space-between' align='center'>
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
									<RoundedBtn bg='purple.500' size='40px' onClick={copy}>
										<BiLink color='white' size='25px' />
									</RoundedBtn>
									{isCopied && <BounceAnimation duration={1} >
										<CheckCircleIcon color='green.400' w='25px' h='25px' />
									</BounceAnimation>}
								</HStack>
								{!isShared ?
									<RoundedBtn bg='red.500' size='40px' onClick={() => setModal('delete_item')}>
										<BiTrash color='white' size='25px' />
									</RoundedBtn>
									:
									<RoundedBtn size='40px' bg='purple.500' onClick={download}>
										<ImCloudDownload color='white' size='25px' />
									</RoundedBtn>
								}
							</Flex>
							<Divider orientation='horizontal' w='100%' bg='white' />
						</Box>
						<VStack spacing={1} align='flex-start'>
							<Heading>{item.title}</Heading>
							<Text fontSize='lg' fontWeight='n' color='gray.400' >{item.description}</Text>
						</VStack>
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
				{!isShared && <ItemTagsRow account={account} id={Number(item.id)} background='gray.900' addIcon linkTag={() => setModal('add_tag')} />}
				<HStack justify='start' spacing={3} w='100%'>
					<a ref={downloadRef} download='' href='' >
					</a>
					{!isShared && <>
						<RoundedBtn size='50px' bg='purple.500' onClick={download}>
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
					</>}
				</HStack>
			</VStack>
			<CreateTagModal account={account} open={modal === 'new_tag'} close={() => setModal(null)} />
			{modal === 'add_tag' && <ItemTagsModal tagsFrom={Number(item.id)} close={(next) => setModal(next || null)} />}
			{modal === 'delete_item' && <DeleteModal
				content={<Text color='gray.200' fontSize='lg' fontWeight='semibold'>
					<Highlight query={item.title} styles={{ bg: 'transparent', color: 'red.500' }}>
						{`You're about to delete this item ( ${item.title} ) from your gallery.`}
					</Highlight>
				</Text>}
				close={() => setModal(null)}
				onClick={deleteItem}
			/>
			}
			<QRCodeModal iconUrl={item.url} url={shareUrl} open={modal === 'qrcode'} close={() => setModal('')} />
		</>
	)}
		{item && <TransferModal
			item={item}
			account={account}
			open={modal === 'transfer'}
			close={() => setModal('')}
			transferItem={transferItem}
		/>}
	</>;
};

export default InstantAuth(TagsWrapper(detail));
