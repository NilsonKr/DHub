import React from 'react';
//UI
import { Flex, ButtonGroup } from '@chakra-ui/react';
import { Upload, NewTag } from '../Index';

export const MenuActions = () => {
	return (
		<Flex justifyContent='end' w='100%' my='20px'>
			<ButtonGroup spacing='5'>
				<NewTag isVariant create={() => {}} />
				<Upload size='sm' fireUpload={() => {}} />
			</ButtonGroup>
		</Flex>
	);
};
