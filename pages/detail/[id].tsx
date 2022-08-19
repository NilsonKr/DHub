import { useState, useEffect, useRef } from 'react';
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
import { Forbidden } from '@components/Detail/Forbidden'
import { PageSkeleton } from '@components/Detail/PageSkeleton'
import { DeleteModal, ShareItem } from '@components/Modal'
import { ItemTags as ItemTagsModal } from '@components/Modal/ItemTags';
//HOC
import TagsWrapper from '@components/HOC/TagsWrapper';
import InstantAuth from '@components/HOC/InstantAuth';
//Utils
import { handleDownload } from '@utils/Item'
import Link from 'next/link';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	//This is necessary due metamaks didnt connect automatically due to unknown next's deal with dynamic routes
	return {
		props: {},
	}
}

const detail = () => {
	const { query } = useRouter()
	const { account } = useWallet()

	const { item, isLoading, isForbidden, deleteItem, updateShareState, transferItem } = useItemDetail(query.id as string, account, query?.share as string)
	const downloadRef = useRef<HTMLAnchorElement>(null)
	const [modal, setModal] = useState<string>('');
	const [isCopied, setCopy] = useState<boolean>(false)

	const isShared = query?.share
	let shareUrl = ''

	useEffect(() => {
		shareUrl = `${window.location.href}?share=${account}&description=${item?.description}&title=${item?.title}&size=${item?.size}&uploadDate=${item?.uploadDate}&url=${item?.url.split('//')[1]}`
	}, [])

	const copy = () => {
		if (!isShared) {
			setModal('share_item')
		} else {
			navigator.clipboard.writeText(window.location.href)
			setCopy(true)
		}
	}

	const download = () => {
		handleDownload(downloadRef, item.url, item.title)
	}

	return <>{(isLoading) ? <PageSkeleton /> : (
		<>
			{isForbidden && <Forbidden />}
			{item && (
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
											{account ?? query?.share}
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
							{!isShared ? <>
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
							</>
								:
								<a href={item.url} target='_blank'>
									<GenericBtn
										hoverColor=''
										rightIcon={<IoIosSend size='30px' color='white' />}
										bg='linear-gradient(90deg, rgba(255, 0, 184, 0.62) 1.1%, #3E02C9 98.9%)'
										handleClick={() => { }}
										fontSize='2xl'
										fontWeight='semibold'
										h='50px'
										borderRadius='10px'
									>
										Watch it on IPFS
									</GenericBtn>
								</a>
							}
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
					{modal === 'share_item' && <ShareItem url={shareUrl} item={item} account={account} updateShareState={updateShareState} close={() => setModal(null)} />}
					<QRCodeModal iconUrl={item.url} url={shareUrl} open={modal === 'qrcode'} close={() => setModal('')} />
				</>
			)}</>)}
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
