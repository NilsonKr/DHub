import React from 'react';
//UI
import {
	Flex,
	Text,
	Input,
	InputGroup,
	InputRightAddon,
	Tag,
	Divider,
} from '@chakra-ui/react';
import { Upload } from '../Buttons';
import { BsFileEarmarkFill } from 'react-icons/bs';
import { EmptyFile, EmptyHubDraw } from '../Icons/';

type TProps = { file: File | null };

export const FileDetail = ({ file }: TProps) => {
	return file ? (
		<Flex></Flex>
	) : (
		<Flex direction='column' align='center' w='100%' mt='50px'>
			<EmptyFile />
			{/* <EmptyHubDraw /> */}
			<Text fontSize={'lg'}>No file selected</Text>
		</Flex>
	);
};
