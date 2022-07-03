import { useState, useEffect } from 'react';
import { useTags } from '@hooks/useTags'
//UI
import { HStack, Text, Flex } from '@chakra-ui/react';
import { NewTag, Clear } from '../Buttons';
import { TagHub } from '../Miscellaneous/Tag';
import { SkeletonTag } from '../Miscellaneous/SkeletonTag';
//DB
import { GetTags } from '@db/tags/index'
import { TagsRecord } from '@roottypes/gallery'

const mockTags = [
	'Background',
	'Images',
	'Photos',
	'Landscape',
	'Work',
	'study',
	'hobbies',
];

type TProps = { newTag: () => void, account: string };

export const TagsCarousel = ({ newTag, account }: TProps) => {
	const { tags, selected, setTagsState, toggleSelect, resetSelected } = useTags()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const fetchTags = () => {
		setIsLoading(true)
		GetTags(account, (snapshot) => {
			const record = snapshot.data() as TagsRecord
			setTagsState(record.tags)
			setIsLoading(false)
		})
	};

	useEffect(fetchTags, []);

	return (
		<Flex align='center' w='100%'>
			{tags.length > 0 && (
				<Clear list={selected} handleClear={resetSelected} />
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
						<TagHub selectedList={selected} select={toggleSelect} tag={tag} key={i} />
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
