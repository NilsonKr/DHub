import { useState, useContext } from 'react';
import { useGallery } from '@hooks/web3/useGallery'
import { authContext } from '@context/AuthContext'
import { useWallet } from '@hooks/web3/useWallet';
import NextImage from 'next/image'
//UI
import { Box, Grid, GridItem, Heading, Flex, Highlight } from '@chakra-ui/react';
import { Card, CreateTagModal, UploadModal, SkeletonCard } from '../components/Index';
import { EmptyHubDraw } from '../components/Icons/';
import { SearchInput, GalleryTags, MenuActions, Upload } from '../components/Index';
import { ItemTags } from '@components/Modal/ItemTags';
//HOC
import InstantAuth from '@components/HOC/InstantAuth'
import TagsWrapper from '@components/HOC/TagsWrapper';

const Gallery = () => {
	const { account } = useWallet()
	const { user } = useContext(authContext)
	const [modal, setModal] = useState<string>('');
	const { files, searchedItems, isLoading, getUserFiles, handleSearch } = useGallery()
	const [selected, setSelected] = useState<number>(null)

	return (
		<>
			<Box as='section' mt='80px' w='100%'>
				<Flex w='100%' justifyContent='space-between' align='end' mb='10px'>
					<Heading>
						<Highlight query={user.name} styles={{ bg: 'transparent', color: 'purple.300' }}>
							{`${user?.name}'s Gallery`}
						</Highlight>
					</Heading>
					{!!files.length && <SearchInput handleSearch={(value: string) => handleSearch('title', value)} />}
				</Flex>
				{files.length > 0 && (
					<MenuActions
						openTag={() => setModal('new_tag')}
						openUpload={() => setModal('new_upload')}
					/>
				)}
				{isLoading && <Grid
					templateColumns='repeat(auto-fill, 240px)'
					autoRows='260px'
					gap='30px 50px'
					py='20px'
					h='65vh'
					overflowY='scroll'
					justifyContent='center'
				>
					{new Array(6).fill(null).map((_, index) => <SkeletonCard key={index} />)}
				</Grid>}
				{/* User has item and matches with filters & searches  */}
				{!isLoading && !!searchedItems.length && (
					<Grid
						templateColumns='repeat(auto-fill, 240px)'
						autoRows='260px'
						gap='30px 50px'
						py='20px'
						h='65vh'
						overflowY='scroll'
						justifyContent='center'
					>
						{searchedItems.map((item, i) => (
							<GridItem key={i} h='100%' w='100%' borderRadius='5px'>
								<Card index={i} item={item} setSelected={() => setSelected(Number(item.id))} openCreateTag={() => setModal('item_tags')} />
							</GridItem>
						))}
					</Grid>
				)}
				{/* User has no items */}
				{!files.length && (
					<Flex h='65vh' w='100%' direction='column' justify='center' align='center'>
						<EmptyHubDraw />
						<Heading mt='3' fontSize='xl'>
							You dont have any Item storaged :(
						</Heading>
						<Upload fireUpload={() => setModal('new_upload')} size='xl' mt='8' />
					</Flex>
				)}
				{/* User has items but no one match with filters or searches */}
				{!!files.length && !searchedItems.length && <Flex h='65vh' w='100%' direction='column' justify='center' align='center'>
					<NextImage src='/assets/search.png' width='160px' height='180px' />
					<Heading mt='3' fontSize='xl'>
						We couldn't find any match :(
					</Heading>
				</Flex>}
				{files.length > 0 && <GalleryTags account={account} openNewTag={() => setModal('new_tag')} />}
			</Box>
			<CreateTagModal
				account={account}
				open={modal === 'new_tag'}
				close={() => {
					setModal('')
					setSelected(null)
				}}
			/>
			{modal === 'item_tags' && <ItemTags tagsFrom={selected} close={(newModal?: string) => setModal(newModal || '')} />}
			{modal === 'new_upload' && <UploadModal refreshItems={getUserFiles} close={() => setModal('')} />}
		</>
	);
};

export default InstantAuth(TagsWrapper(Gallery));
