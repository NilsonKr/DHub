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

export const UpdateProfilePicModal = ({ close }: TProps) => {
	const [file, setFile] = useState<File | null>(null);
	const [isProcessed, setProcessed] = useState<boolean>(false);

	const handleFile = (file: File) => {
		file && setFile(file);
		if (isProcessed) setProcessed(false);
	};

	return (
		<Modal isOpen={true} onClose={close}>
			<ModalOverlay />
			<ModalContent bg='gray.800' pb='30px'>
				<ModalCloseButton />
				<ModalBody>
					<DragNDrop handleFile={handleFile} label='Drag & drop your picture' />
					<FileDetail
						blockEdit
						file={file}
						isProcessed={isProcessed}
						btnLabel='Update'
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
