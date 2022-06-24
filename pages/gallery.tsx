import { useState, useEffect } from 'react';
import { useGallery } from '@hooks/web3/useGallery'
//UI
import { Box, Grid, GridItem, Heading, Flex } from '@chakra-ui/react';
import { Card, CreateTagModal, UploadModal, SkeletonCard } from '../components/Index';
import { BgLeftAdornment, BgRightAdornment, EmptyHubDraw } from '../components/Icons/';
import { SearchInput, TagsCarousel, MenuActions, Upload } from '../components/Index';
//HOC
import InstantAuth from '@components/HOC/InstantAuth'

const gallery = () => {
	const [query, setQuery] = useState<string>('');
	const [modal, setModal] = useState<string>('');
	const { files, isLoading, getUserFiles } = useGallery()

	return (
		<>
			<Box as='section' mt='80px' w='100%'>
				<Flex w='100%' justifyContent='space-between' align='end' mb='10px'>
					<Heading>NilsonKr's Gallery</Heading>
					{!!files.length && <SearchInput
						value={query}
						handleChange={ev => setQuery(ev.target.value)}
						clear={() => setQuery('')}
					/>}
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
				</Grid>
				}
				{!isLoading && (files.length ? (
					<Grid
						templateColumns='repeat(auto-fill, 240px)'
						autoRows='260px'
						gap='30px 50px'
						py='20px'
						h='65vh'
						overflowY='scroll'
						justifyContent='center'
					>
						{files.map((item, i) => (
							<GridItem key={i} h='100%' w='100%' borderRadius='5px'>
								<Card />
							</GridItem>
						))}
					</Grid>
				) : (
					<Flex h='65vh' w='100%' direction='column' justify='center' align='center'>
						<EmptyHubDraw />
						<Heading mt='3' fontSize='xl'>
							You dont have any Item storaged :(
						</Heading>
						<Upload fireUpload={() => setModal('new_upload')} size='xl' mt='8' />
					</Flex>
				))}
				{files.length > 0 && <TagsCarousel newTag={() => { }} />}
			</Box>
			<Box position='absolute' top='0px' left='10px' zIndex='-1'>
				<BgLeftAdornment />
			</Box>
			<Box position='absolute' bottom='0px' right='0px' zIndex='-1'>
				<BgRightAdornment />
			</Box>
			<CreateTagModal open={modal === 'new_tag'} close={() => setModal('')} />
			{modal === 'new_upload' && <UploadModal refreshItems={getUserFiles} close={() => setModal('')} />}
		</>
	);
};

export default InstantAuth(gallery);
