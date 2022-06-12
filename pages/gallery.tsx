import { useState, useEffect } from 'react';
//UI
import { Card, CreateTagModal, UploadModal } from '../components/Index';
import { BgLeftAdornment, BgRightAdornment, EmptyHubDraw } from '../components/Icons/';
import { Box, Grid, GridItem, Heading, Flex } from '@chakra-ui/react';
import { SearchInput, TagsCarousel, MenuActions, Upload } from '../components/Index';
//HOC
import InstantAuth from '@components/HOC/InstantAuth'

const gallery = () => {
	const [list, setList] = useState<any[]>([]);
	const [query, setQuery] = useState<string>('');
	const [modal, setModal] = useState<string>('');

	const fetchData = () => {
		const mockList = new Array(10).fill('');
		setList(mockList);
	};

	useEffect(fetchData, []);

	return (
		<>
			<Box as='section' mt='80px' w='100%'>
				<Flex w='100%' justifyContent='space-between' align='end' mb='10px'>
					<Heading>NilsonKr's Gallery</Heading>
					<SearchInput
						value={query}
						handleChange={ev => setQuery(ev.target.value)}
						clear={() => setQuery('')}
					/>
				</Flex>
				{list.length > 0 && (
					<MenuActions
						openTag={() => setModal('new_tag')}
						openUpload={() => setModal('new_upload')}
					/>
				)}
				{list.length ? (
					<Grid
						templateColumns='repeat(auto-fill, 240px)'
						autoRows='260px'
						gap='30px 50px'
						py='20px'
						h='65vh'
						overflowY='scroll'
						justifyContent='center'
					>
						{list.map((item, i) => (
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
						<Upload fireUpload={() => { }} size='xl' mt='8' />
					</Flex>
				)}
				{list.length > 0 && <TagsCarousel newTag={() => { }} />}
			</Box>
			<Box position='absolute' top='0px' left='10px' zIndex='-1'>
				<BgLeftAdornment />
			</Box>
			<Box position='absolute' bottom='0px' right='0px' zIndex='-1'>
				<BgRightAdornment />
			</Box>
			<CreateTagModal open={modal === 'new_tag'} close={() => setModal('')} />
			{modal === 'new_upload' && <UploadModal close={() => setModal('')} />}
		</>
	);
};

export default InstantAuth(gallery);
