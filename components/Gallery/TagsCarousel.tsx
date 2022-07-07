import { useContext } from 'react';
//Context
import { tagsContext } from '@context/TagsContext'
//UI
import { HStack, Text, Flex, useToast } from '@chakra-ui/react';
import { NewTag, Clear } from '../Buttons';
import { TagHub } from '../Miscellaneous/Tag';
import { SkeletonTag } from '../Miscellaneous/SkeletonTag';
//Db
import { DeleteTag } from '@db/tags'

const mockTags = [
	'Background',
	'Images',
	'Photos',
	'Landscape',
	'Work',
	'study',
	'hobbies',
];

type TProps = {
	account: string,
	selected?: string[],
	newTag: () => void,
	toggleSelect?: (tag: string) => void;
	resetSelected?: () => void
};

export const TagsCarousel = ({ account, selected, newTag, resetSelected, toggleSelect }: TProps) => {
	const showToast = useToast()
	const tagsContextValues = useContext(tagsContext)

	const { tags, isLoading } = tagsContextValues

	const selectedTags = selected || tagsContextValues.selected
	const toggleTag = toggleSelect || tagsContextValues.toggleSelect
	const resetSelectedTags = resetSelected || tagsContextValues.resetSelected

	const deleteMethod = async (tag: string, cb: () => void) => {
		try {
			await DeleteTag(account, tag)

			cb()
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
	}

	return (
		<Flex align='center' w='100%'>
			{tags.length > 0 && (
				<Clear list={selectedTags} handleClear={resetSelectedTags} />
			)}
			<HStack
				w='100%'
				m='6px 0 6px 25px'
				pb='3'
				pt='5'
				spacing='1'
				overflowY='auto'
				overflowX='scroll'
			>
				{!isLoading && (tags.length > 0 ? (
					tags.map((tag, i) => (
						<TagHub deleteTag={deleteMethod} selectedList={selectedTags} select={toggleTag} tag={tag} key={i} />
					))
				) : (
					<>
						<Text fontSize='lg' mr='2'>
							👋 You don't have any tags yet, Create your first one!
						</Text>
						<NewTag isVariant={false} create={newTag} />
					</>
				))}
				{isLoading && mockTags.map(() => <SkeletonTag />)}
			</HStack>
		</Flex>
	);
};
