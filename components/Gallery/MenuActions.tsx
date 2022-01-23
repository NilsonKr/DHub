import React from 'react';
//UI
import { Flex, ButtonGroup } from '@chakra-ui/react';
import { Upload, NewTag } from '../Index';

type TProps = { openTag: () => void; openUpload: () => void };

export const MenuActions = ({ openTag, openUpload }: TProps) => {
	return (
		<Flex justifyContent='end' w='100%' my='20px'>
			<ButtonGroup spacing='5'>
				<NewTag isVariant create={openTag} />
				<Upload size='sm' fireUpload={openUpload} />
			</ButtonGroup>
		</Flex>
	);
};
