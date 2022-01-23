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
} from '@chakra-ui/react';
import { AiOutlineTags } from 'react-icons/ai';
import { GenericBtn } from '../Buttons/index';

type TProps = { close: () => void; open: boolean };

export const CreateTagModal = ({ open, close }: TProps) => {
	return (
		<Modal isOpen={open} onClose={close}>
			<ModalOverlay />
			<ModalContent bg='gray.700'>
				<ModalCloseButton />
				<ModalHeader>Crate New Tag</ModalHeader>
				<ModalBody my='5'>
					<InputGroup>
						<Input placeholder='Type a name' _placeholder={{ color: 'gray.400' }} />
						<InputRightAddon
							bg='purple.500'
							children={<Icon color='white' h='25px' w='25px' as={AiOutlineTags} />}
						/>
					</InputGroup>
				</ModalBody>
				<ModalFooter>
					<ButtonGroup spacing={4}>
						<Button onClick={close} variant='outline' colorScheme='white'>
							Close
						</Button>
						<GenericBtn w='100px' handleClick={() => {}} colorSchema='purple'>
							Create
						</GenericBtn>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
