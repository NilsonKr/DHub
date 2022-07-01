import { useState, useEffect } from 'react';
import { useTags } from '@hooks/useTags'
//UI
import { HStack, Text, Flex } from '@chakra-ui/react';
import { NewTag, Clear } from '../Buttons';
import { TagHub } from '../Miscellaneous/Tag';


const tagsList = [
	'Background',
	'Images',
	'Photos',
	'Landscape',
	'Work',
	'study',
	'hobbies',
	'Photoss',
	'Landscapes',
	'Works',
	'studys',
	'hobbiess',
];

type TProps = { newTag: () => void };

export const TagsCarousel = ({ newTag }: TProps) => {
	const { tags, selected, setTagsState, toggleSelect, resetSelected } = useTags()

	const fetchTags = () => {
		setTagsState(tagsList);
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
				spacing={1}
				overflowY='auto'
				overflowX='scroll'
			>
				{tags.length > 0 ? (
					tagsList.map((tag, i) => (
						<TagHub selectedList={selected} select={toggleSelect} tag={tag} key={i} />
					))
				) : (
					<>
						<Text fontSize='lg'>
							👋 You don't have any tags yet, Create your first one!
						</Text>
						<NewTag isVariant={false} create={newTag} />
					</>
				)}
			</HStack>
		</Flex>
	);
};
