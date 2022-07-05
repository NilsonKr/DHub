import { useState } from 'react';
//UI
import {
	Popover,
	PopoverTrigger,
	PopoverArrow,
	PopoverBody,
	PopoverFooter,
	PopoverContent,
	VStack,
	HStack,
	PopoverCloseButton,
	Heading,
	Text,
	Fade,
	useToast
} from '@chakra-ui/react';
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { BsFillTagsFill } from 'react-icons/bs';
import { GenericBtn } from '../Buttons';
//Db
import { DeleteTag } from '@db/tags'

type TProps = { account: string; tag: Ttag; selectedList: Ttag[]; select: (tag: Ttag) => void; };

export const TagHub = ({ account, tag, selectedList, select }: TProps) => {
	const showToast = useToast()
	const [view, setView] = useState<number>(0);
	const [openDelete, setOpenDelete] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleToggle = () => {
		setOpenDelete(prev => !prev)
		setView(0)
	}

	const handleDeleteTag = async () => {
		setIsLoading(true)
		try {
			await DeleteTag(account, tag)

			handleToggle()
			showToast({
				title: `Bye bye ${tag}!`,
				description: `Your old tag has been deleted`,
				status: 'success',
				duration: 200,
				position: 'top',
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
		setIsLoading(true)
	}

	return (
		<Popover isOpen={openDelete} onClose={() => setOpenDelete(false)} closeOnBlur={true}>
			<PopoverTrigger>
				<Tag
					onClick={() => select(tag)}
					onContextMenu={e => {
						e.preventDefault();
						handleToggle()
					}}
					_hover={{ bg: 'pink.800' }}
					cursor='pointer'
					transform={selectedList.includes(tag) ? 'translateY(-8px)' : 'translateY(0px)'}
					transition='transform .1s linear'
					bg={selectedList.includes(tag) ? 'pink.300' : '#FF0099'}
					borderRadius='10px'
					minW='auto'
					pr='10px'
				>
					<TagLeftIcon color='black' mr='2' as={BsFillTagsFill} />
					<TagLabel size={'lg'} color='white'>
						{tag}
					</TagLabel>
				</Tag>
			</PopoverTrigger>
			<Fade in={true}>
				<PopoverContent
					p={view === 0 ? '0' : '2'}
					_focus={{ boxShadow: 'unset', outline: 'unset' }}
				>
					<PopoverArrow />
					{view === 1 && <PopoverCloseButton />}
					<PopoverBody p={view === 0 ? '0' : 'current'}>
						{view === 0 && openDelete && (
							<HStack
								onClick={() => setView(1)}
								p='5'
								_hover={{ bg: 'gray.600' }}
								cursor='pointer'
							>
								<DeleteIcon w='20px' h='20px' color='red' />
								<Text>Delete</Text>
							</HStack>
						)}
						{view === 1 && (
							<VStack spacing={3} textAlign='center' justify='center' px='2'>
								<Heading fontSize='xl'>Are you sure?</Heading>
								<Text fontSize='.95rem'> You are about to delete "{tag}" tag</Text>
							</VStack>
						)}
					</PopoverBody>
					{view === 1 && (
						<PopoverFooter borderColor='transparent' mt='2'>
							<HStack w='100%' justify='end' spacing={3}>
								<GenericBtn
									handleClick={handleToggle}
									activeColor='purple.900'
									hoverColor='gray.800'
									variant='outline'
									borderColor='purple.500'
								>
									Cancel
								</GenericBtn>
								<GenericBtn
									handleClick={handleDeleteTag}
									bg='red.400'
									hoverColor='red.600'
									activeColor='red.300'
								>
									Delete
								</GenericBtn>
							</HStack>
						</PopoverFooter>
					)}
				</PopoverContent>
			</Fade>
		</Popover>
	);
};
