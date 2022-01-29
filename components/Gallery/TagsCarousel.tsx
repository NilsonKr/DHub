import { useState, useEffect } from 'react';
//UI
import { HStack, Text, Flex } from '@chakra-ui/react';
import { NewTag, Clear } from '../Buttons';
import { TagHub } from './Tag';

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
	const [tags, setTags] = useState<Ttag[] | void[]>([]);
	const [selected, setSelectedTags] = useState<Ttag[]>([]);

	const toggleSelect = (tag: Ttag) => {
		if (selected.includes(tag)) {
			const newSelected = [...selected];
			const tagIdx = selected.findIndex(t => t === tag);

			newSelected.splice(tagIdx, 1);
			setSelectedTags(newSelected);
		} else {
			setSelectedTags(prev => [...prev, tag]);
		}
	};

	const fetchTags = () => {
		setTags(tagsList);
	};

	useEffect(fetchTags, []);

	return (
		<Flex align='center'>
			{tags.length > 0 && (
				<Clear list={selected} handleClear={() => setSelectedTags([])} />
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
