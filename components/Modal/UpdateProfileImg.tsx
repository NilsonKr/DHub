import React, { useState, useContext } from 'react';
import { addFileToIpfs } from '@ipfs/methods'
import { useContract } from '@hooks/web3/useContract'
import { useWallet } from '@hooks/web3/useWallet'
import { authContext } from '@context/AuthContext'
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

type TProps = { close: () => void };

export const UpdateProfilePicModal = ({ close }: TProps) => {
	const { login } = useContext(authContext)
	const [file, setFile] = useState<File | null>(null);
	const [isProcessed, setProcessed] = useState<boolean>(false);
	const showToast = useToast()
	const { account } = useWallet()
	const Dhub = useContract()

	const handleFile = async (file: File) => {
		if (file) {
			setFile(file);
		}
		if (isProcessed) setProcessed(false);
	};

	const uploadFile = async () => {
		try {
			const ipfsResult = await addFileToIpfs(file)
			const ipfsUrl = `https://ipfs.infura-ipfs.io/ipfs/${ipfsResult.payload.path}`

			Dhub.methods.editUser('profileUrl', ipfsUrl).send({ from: account })
				.on('transactionHash', () => {
					showToast({
						variant: 'solid',
						title: `Request to upload new profile pic was sended`,
						description: 'This may take a few seconds o minutes , we will notify you when the transaction was done',
						status: 'info',
						duration: 4500,
						position: 'top',
					})
				})
				.on('receipt', () => {
					login()
					showToast({
						title: `Profile updated!`,
						description: `Your new profile photo was succesfully uploaded`,
						status: 'success',
						duration: 5000,
						position: 'top',
					})
				})
		} catch (error) {
			showToast({
				title: `There was an unexpected error`,
				description: 'Please, try again',
				status: 'error',
				duration: 2500,
				position: 'top',
			})
		}
	}

	return (
		<Modal isOpen={true} onClose={close}>
			<ModalOverlay />
			<ModalContent bg='gray.800' pb='30px'>
				<ModalCloseButton />
				<ModalBody>
					<DragNDrop handleFile={handleFile} label='Drag & drop your picture' />
					<FileDetail
						fireUpload={uploadFile}
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
