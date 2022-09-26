import { useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react';
import Image from 'next/image';
import { useForm } from '@hooks/useForm'
//UI
import {
	Flex,
	VStack,
	Text,
	Input,
	InputGroup,
	InputRightAddon,
	Tag,
	Box,
	Textarea,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { Upload } from '../Buttons';
import { BsFileEarmarkFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { EmptyFile } from '../Icons/';
//Utils
import { ProcessFile } from '@components/Utils/processFile';
import { formatRawSize } from '@utils/Item'

type TProps = {
	file: File | null;
	fireUpload: (info: TFileInfo, form: DocumentForm) => Promise<void> | void;
	isProcessed?: boolean;
	imgInfo?: TFileDefaulInfo;
	btnLabel?: string;
	blockEdit?: boolean;
	loading?: boolean
};

export const FileDetail = ({ file, isProcessed, imgInfo, btnLabel, blockEdit, loading, fireUpload }: TProps) => {
	const { form, handleChange } = useForm({ name: '', description: '' })
	const [info, setInfo] = useState<TFileInfo>({ size: '', ext: '' });
	const [isDescription, setDescription] = useState<boolean>(false)

	useEffect(() => {
		if (isProcessed && imgInfo) {
			handleChange('name', imgInfo.name)
			setInfo({
				size: imgInfo.size,
				ext: imgInfo.ext,
				img: imgInfo.img,
			});
		}
	}, []);

	useEffect(() => {
		if (file && !isProcessed) {
			//Get only the name
			const nameBits = file.name.split('.');
			nameBits.splice(nameBits.length - 1, 1);
			//Get size expressed by MB or KB
			const size = formatRawSize(file!.size)
			//Get a image url to display preview
			const urlPreview = ProcessFile(file);

			setInfo({
				size: size,
				rawSize: file.size,
				ext: file.type.split('/')[1],
				img: urlPreview,
			});
			handleChange('name', nameBits.join('.'));
		}
	}, [file]);

	return file || isProcessed ? (
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
						{form.name}.{info.ext}
					</Text>
				</VStack>
				<VStack spacing={3} mr='10px' align='start'>
					<Box>
						<InputGroup w='230px'>
							<Input
								value={form.name}
								onChange={ev => handleChange('name', ev.target.value)}
								borderColor='gray.500'
								variant='flushed'
								maxLength={18}
								placeholder='Type your filename...'
								disabled={blockEdit}
							/>
							<InputRightAddon bg={blockEdit ? 'purple.900' : 'purple.500'}>
								<MdEdit size='20px' color='white' />
							</InputRightAddon>
						</InputGroup>
						<Text fontSize='xs' mt='1' color='gray.500'>
							Maximun 18 characters*
						</Text>
						{isDescription ?
							<Textarea
								value={form.description}
								onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange('description', e.target.value)}
								my='2'
								placeholder='Write your description here'
								variant="filled"
								_focus={{ bg: 'gray.750' }}
								_placeholder={{ fontSize: '.9rem', color: 'gray.500' }}
							/>
							: <Flex align='center' gap='2' mt='3' cursor='pointer' onClick={() => setDescription(true)}>
								<AddIcon color='purple.400' />
								<Text fontSize='sm' fontWeight='600' color='purple.400'>
									Add a description
								</Text>
							</Flex>}
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
				fireUpload={() => fireUpload(info, form as DocumentForm)}
				w='60%'
				m='30px auto 0'
				display='block'
				justify='space-around'
				disabled={form.name === '' || loading}
				_hover={{ bg: 'purple.300' }}
				label={btnLabel}
				loading={loading}
			/>
		</>
	) : (
		<Flex direction='column' align='center' w='100%' mt='50px'>
			<EmptyFile />
			<Text fontSize={'lg'}>No file selected</Text>
		</Flex>
	);
};
