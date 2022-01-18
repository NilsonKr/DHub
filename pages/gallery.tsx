import React from 'react';
//UI

import { Card } from '../components/Index';
import { BgLeftAdornment, BgRightAdornment } from '../components/Icons/';
import { Box, Grid, GridItem, Heading, Flex } from '@chakra-ui/react';

const gallery = () => {
	return (
		<>
			<Box as='section' mt='80px'>
				<Flex>
					<Heading mb='10px'>NilsonKr's Gallery</Heading>
				</Flex>
				<Grid
					templateColumns='repeat(auto-fill, 240px)'
					autoRows='260px'
					gap='30px 50px'
					py='20px'
					h='65vh'
					overflowY='scroll'
					justifyContent='center'
				>
					<GridItem h='100%' w='100%' borderRadius='5px'>
						<Card />
					</GridItem>
					<GridItem h='100%' w='100%'>
						<Card />
					</GridItem>
					<GridItem h='100%' w='100%'>
						<Card />
					</GridItem>
					<GridItem h='100%' w='100%'>
						<Card />
					</GridItem>
					<GridItem h='100%' w='100%'>
						<Card />
					</GridItem>
					<GridItem h='100%' w='100%'>
						<Card />
					</GridItem>
					<GridItem h='100%' w='100%'>
						<Card />
					</GridItem>
					<GridItem h='100%' w='100%'>
						<Card />
					</GridItem>
					<GridItem h='100%' w='100%'>
						<Card />
					</GridItem>
					<GridItem h='100%' w='100%'>
						<Card />
					</GridItem>
				</Grid>
			</Box>
			<Box position='absolute' top='0px' left='10px' zIndex='-1'>
				<BgLeftAdornment />
			</Box>
			<Box position='absolute' bottom='0px' right='0px' zIndex='-1'>
				<BgRightAdornment />
			</Box>
		</>
	);
};

export default gallery;
