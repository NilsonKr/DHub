import React from 'react';
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
} from '@chakra-ui/react';
import { AiOutlineTags } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import { GenericBtn } from '../Buttons/index';

type TProps = { close: () => void; open: boolean };

export const TransferModal = ({ open, close }: TProps) => {
	return (
		<Modal isOpen={open} onClose={close}>
			<ModalOverlay />
			<ModalContent bg='gray.800'>
				<ModalCloseButton />
				<ModalHeader>Transfer "MyNft.jpg"</ModalHeader>
				<ModalBody my='5'>
					<Text fontSize='sm' color='gray.500'>
						From (Your address)
					</Text>
					<InputGroup mb='5'>
						<Input
							variant='flushed'
							disabled={true}
							value='CHUS5tFC6CMvJLVm8hVHpbpJ5DUyGr4CbhGfRyy6D1w3'
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
						/>
						<InputRightAddon
							bg='purple.600'
							children={<Icon color='white' h='18px' w='18px' as={RiSendPlaneFill} />}
						/>
					</InputGroup>
				</ModalBody>
				<ModalFooter>
					<ButtonGroup spacing={4}>
						<Button onClick={close} variant='outline' colorScheme='white'>
							Cancel
						</Button>
						<GenericBtn w='100px' handleClick={() => {}} colorSchema='purple'>
							Transfer
						</GenericBtn>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
