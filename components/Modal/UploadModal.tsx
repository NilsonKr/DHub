import React, { useState } from 'react';
//UI
import { FileDetail } from './FileDetail';
import { DragNDrop } from '../Miscellaneous/DragNDrop';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';

type TProps = { close: () => void };

export const UploadModal = ({ close }: TProps) => {
	const [file, setFile] = useState<File | null>(null);

	const handleFile = (file: File) => {
		setFile(file);
	};

	return (
		<Modal isOpen={true} onClose={close}>
			<ModalOverlay />
			<ModalContent bg='gray.800' pb='30px'>
				<ModalCloseButton />
				<ModalBody>
					<DragNDrop handleFile={handleFile} label='Drag & drop your picture' />
					<FileDetail file={file} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
