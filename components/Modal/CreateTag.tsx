import React, { useState, useContext } from 'react';
import { tagsContext } from '@context/TagsContext'
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
	Spinner,
	Divider,
	useToast
} from '@chakra-ui/react';
import { AiOutlineTags } from 'react-icons/ai';
import { GenericBtn } from '../Buttons/index';
//DB
import { AddTag, CreateTags } from '@db/tags'

type TProps = { account: string; open: boolean; close: () => void; };

export const CreateTagModal = ({ account, open, close }: TProps) => {
	const { tags } = useContext(tagsContext)
	const showToast = useToast()
	const [tag, setTag] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleAddTag = (tag: string) => {
		return tags.length ? AddTag(account, tag) : CreateTags(account, tag)
	}

	const handleTagCreation = async () => {
		setIsLoading(true)
		try {
			await handleAddTag(tag)

			showToast({
				title: `You got a new tag!`,
				description: `Your new tag "${tag}" was added`,
				status: 'success',
				duration: 1500,
				position: 'top',
			})
			close()
		} catch (error) {
			showToast({
				title: `There was an unexpected error`,
				description: 'Please, try again',
				status: 'error',
				duration: 2500,
				position: 'top',
			})
		}
		setIsLoading(false)
	}

	return (
		<Modal isOpen={open} onClose={close}>
			<ModalOverlay />
			<ModalContent bg='gray.800'>
				<ModalCloseButton />
				<ModalHeader>Crate New Tag</ModalHeader>
				<ModalBody my='4'>
					<InputGroup>
						<Input onChange={(e) => setTag(e.target.value)} placeholder='Type a name' _placeholder={{ color: 'gray.400' }} />
						<InputRightAddon bg='purple.500'>
							<Icon color='white' h='25px' w='25px' as={AiOutlineTags} />
						</InputRightAddon>
					</InputGroup>
				</ModalBody>
				<ModalFooter>
					<ButtonGroup spacing={4}>
						<Button onClick={close} variant='outline' colorScheme='white' disabled={isLoading}>
							Close
						</Button>
						<GenericBtn w='100px' handleClick={handleTagCreation} disabled={!tag || isLoading} colorSchema='purple'>
							{isLoading ? <Spinner size='md' color='white' /> : 'Create'}
						</GenericBtn>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
