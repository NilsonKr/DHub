import React, { useState } from 'react';
//UI
import { FileDetail } from './FileDetail';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Heading,
	Button,
	Square,
} from '@chakra-ui/react';
import { IoIosCloudUpload } from 'react-icons/io';

type TProps = { close: () => void };

export const UploadModal = ({ close }: TProps) => {
	const [isDrag, setDrag] = useState<Boolean>(false);
	const [file, setFile] = useState<File | null>(null);

	const handleFile = (file: File) => {
		setFile(file);
	};

	const handleDragEnter = (ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault();
		ev.stopPropagation();
		if (!isDrag) {
			setDrag(true);
		}
	};

	const handleDragExit = (ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault();
		ev.stopPropagation();
		if (isDrag) {
			setDrag(false);
		}
	};

	const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault();
		ev.stopPropagation();
		handleFile(ev.dataTransfer.files[0]);
		// console.log(ev.dataTransfer.files);

		if (isDrag) {
			setDrag(false);
		}
	};

	return (
		<Modal isOpen={true} onClose={close}>
			<ModalOverlay />
			<ModalContent bg='gray.800' pb='30px'>
				<ModalCloseButton />
				<ModalBody>
					<Square
						onDragOver={handleDragEnter}
						onDragLeave={handleDragExit}
						onDropCapture={handleDrop}
						bg={isDrag ? '#8800ff45' : 'transparent'}
						w='100%'
						h='280px'
						py='50px'
						mt='40px'
						textAlign='center'
						border='2px dashed purple'
						borderColor='purple.500'
						borderRadius='10px'
						justifyContent='space-around'
						flexDirection='column'
					>
						<Heading fontSize='xl'>Drag & Drop your file here</Heading>
						<Heading>Or</Heading>
						<Button
							as={'label'}
							htmlFor='file'
							cursor='pointer'
							_hover={{ bg: 'purple.400' }}
							_active={{ bg: 'purple.600', border: 'none' }}
							bg='purple.500'
							boxShadow='rgb(148 0 255 / 40%) 0px 19px 38px, rgb(34 0 60 / 50%) 0px 15px 12px'
						>
							Browse file
							<input
								onChange={ev => setFile(ev.target.files![0])}
								multiple={false}
								type='file'
								id='file'
								style={{ width: 0, height: 0, opacity: 0 }}
							/>
						</Button>
					</Square>
					<FileDetail file={file} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
