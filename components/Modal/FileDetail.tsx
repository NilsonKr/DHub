import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProcessFile } from '../Utils/processFile';
//UI
import {
	Flex,
	VStack,
	Text,
	Input,
	InputGroup,
	InputRightAddon,
	Tag,
	Divider,
	Box,
} from '@chakra-ui/react';
import { Upload } from '../Buttons';
import { BsFileEarmarkFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { EmptyFile } from '../Icons/';

type TProps = { file: File | null };
type TInfo = { img?: string | false; size: string; ext: string };

export const FileDetail = ({ file }: TProps) => {
	const [fileName, setFileName] = useState<string>('');
	const [info, setInfo] = useState<TInfo>({ size: '', ext: '' });

	useEffect(() => {
		if (file) {
			//Get only the name
			const nameBits = file.name.split('.');
			nameBits.splice(nameBits.length - 1, 1);
			//Get size expressed by MB or KB
			const size =
				file!.size / 1000000 < 1
					? `${(file!.size / 1024).toFixed(1)} KB`
					: `${(file!.size / 1000000).toFixed(2)} MB`;
			//Get a image url to display preview
			const urlPreview = ProcessFile(file);

			console.log(urlPreview);
			setInfo({
				size: size,
				ext: file.type.split('/')[1],
				img: urlPreview,
			});
			setFileName(nameBits.join('.'));
		}
	}, [file]);

	return file ? (
		<>
			<Flex justify='space-around' p='10px' mt='8'>
				<VStack spacing={3} mr='10px' textAlign='center'>
					{info.img ? (
						<Image
							src={info.img}
							alt='preview'
							placeholder='blur'
							blurDataURL={info.img}
							width='80px'
							height='80px'
						/>
					) : (
						<BsFileEarmarkFill color='white' size='50px' />
					)}
					<Text fontSize='sm' color='gray.400'>
						{fileName}.{info.ext}
					</Text>
				</VStack>
				<VStack spacing={3} mr='10px' align='start'>
					<Box>
						<InputGroup w='230px'>
							<Input
								value={fileName}
								onChange={ev => setFileName(ev.target.value)}
								borderColor='gray.500'
								variant='flushed'
								maxLength={18}
								placeholder='Type your filename...'
							/>

							<InputRightAddon bg='purple.500'>
								<MdEdit size='20px' color='white' />
							</InputRightAddon>
						</InputGroup>
						<Text fontSize='xs' mt='1' color='gray.500'>
							Maximun 18 characters*
						</Text>
					</Box>
					<Text fontWeight='semibold'>
						Size:{' '}
						<Tag ml='2' bg='pink.500'>
							{info.size}
						</Tag>
					</Text>
				</VStack>
			</Flex>
			<Upload
				size='xl'
				fireUpload={() => {}}
				w='60%'
				m='30px auto 0'
				display='block'
				justify='space-around'
				disabled={fileName === ''}
				_hover={{ bg: 'purple.300' }}
			/>
		</>
	) : (
		<Flex direction='column' align='center' w='100%' mt='50px'>
			<EmptyFile />
			{/* <EmptyHubDraw /> */}
			<Text fontSize={'lg'}>No file selected</Text>
		</Flex>
	);
};
