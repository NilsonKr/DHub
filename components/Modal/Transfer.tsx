import React, { useState } from 'react';
//UI
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	InputGroup,
	Input,
	InputRightAddon,
	Icon,
	Button,
	ButtonGroup,
	Text,
	Spinner,
} from '@chakra-ui/react';
import { AiOutlineTags } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import { GenericBtn } from '../Buttons/index';
//Types
import { Item } from '@roottypes/gallery'


type TProps = {
	item: Item;
	account: string;
	open: boolean;
	transferItem: (target: string) => Promise<void>;
	close: () => void;
};

export const TransferModal = ({ item, open, account, transferItem, close }: TProps) => {
	const [receiver, setReceiver] = useState<string>('')
	const [isLoading, setLoading] = useState<boolean>(false)

	const handleTransfer = async () => {
		setLoading(true)
		await transferItem(receiver)
		setLoading(false)
	}

	return (
		<Modal isOpen={open} onClose={close}>
			<ModalOverlay />
			<ModalContent bg='gray.800'>
				<ModalCloseButton />
				<ModalHeader>Transfer "{item.title}"</ModalHeader>
				<ModalBody my='5'>
					<Text fontSize='sm' color='gray.500'>
						From (Your address)
					</Text>
					<InputGroup mb='5'>
						<Input
							variant='flushed'
							disabled={true}
							value={account}
						/>
					</InputGroup>
					<Text fontSize='sm' color='gray.500'>
						To...
					</Text>
					<InputGroup>
						<Input
							variant='flushed'
							placeholder='Receiver Address'
							_placeholder={{ color: 'gray.400' }}
							value={receiver}
							onChange={e => setReceiver(e.target.value)}
							disabled={isLoading}
						/>
						<InputRightAddon bg='purple.600'>
							<Icon color='white' h='18px' w='18px' as={RiSendPlaneFill} />
						</InputRightAddon>
					</InputGroup>
				</ModalBody>
				<ModalFooter>
					<ButtonGroup spacing={4}>
						<Button onClick={close} variant='outline' colorScheme='white'>
							Cancel
						</Button>
						<GenericBtn w='100px' handleClick={handleTransfer} disabled={isLoading} colorSchema='purple'>
							{isLoading ? <Spinner /> : 'Transfer'}
						</GenericBtn>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
