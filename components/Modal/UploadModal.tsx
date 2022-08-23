import React, { useState } from 'react';
import { useContract } from '@hooks/web3/useContract'
import { useWallet } from '@hooks/web3/useWallet'
//UI
import { FileDetail } from './FileDetail';
import { DragNDrop } from '../Miscellaneous/DragNDrop';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	useToast
} from '@chakra-ui/react';
//Types
import { UploadResponse } from '@roottypes/api/files'

type TProps = { close: () => void, refreshItems: (acc: string) => Promise<void> };

export const UploadModal = ({ close, refreshItems }: TProps) => {
	const [file, setFile] = useState<File | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false)
	const Dhub = useContract()
	const { account } = useWallet()
	const showToast = useToast()

	const handleFile = (file: File) => {
		setFile(file);
	};

	const upload = async (info: TFileInfo, fileForm: DocumentForm) => {
		setLoading(true)
		try {
			const requestBody = new FormData()
			requestBody.append('file', file)

			//Upload file to ipfs to get the hash url
			const result = await window.fetch('/api/uploadFile', {
				method: 'POST',
				body: requestBody,
			})
			const data: UploadResponse = await result.json()
			const ipfsUrl = `https://dhub.infura-ipfs.io/ipfs/${data.hash}`

			//Save file record on contract
			const fileRecord = [0, ipfsUrl, fileForm.name, fileForm.description, new Date().toString(), info.rawSize, false]
			await Dhub.methods.uploadFile(fileRecord).send({ from: account })

			refreshItems(account)
			showToast({
				title: `Successful upload`,
				description: `There's a new item in your storage!`,
				status: 'success',
				duration: 4000,
				position: 'top',
			})
			close()
		} catch (error) {
			showToast({
				title: `There was an unexpected error uploading your item`,
				description: 'Please, try again',
				status: 'error',
				duration: 5000,
				position: 'top',
			})
		}
		setLoading(false)
	}

	return (
		<Modal isOpen={true} onClose={close}>
			<ModalOverlay />
			<ModalContent bg='gray.800' pb='30px'>
				<ModalCloseButton />
				<ModalBody>
					<DragNDrop loading={isLoading} handleFile={handleFile} label='Drag & drop your picture' />
					<FileDetail file={file} fireUpload={upload} loading={isLoading} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
