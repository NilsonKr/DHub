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
	const [isProcessed, setProcessed] = useState<boolean>(true);

	const handleFile = (file: File) => {
		setFile(file);
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
						file={file}
						isProcessed={isProcessed}
						imgInfo={{
							name: 'MyNft',
							size: '32.2 KB',
							ext: 'png',
							img: '/assets/MyNft.png',
						}}
						btnLabel='Update'
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
