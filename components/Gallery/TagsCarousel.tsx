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
	'Photos',
	'Landscape',
	'Work',
	'study',
	'hobbies',
];

type Ttag = string;
type TProps = { newTag: () => void };

export const TagsCarousel = ({ newTag }: TProps) => {
	const [tags, setTags] = useState<Ttag[] | void[]>([]);

	const fetchTags = () => {
		setTags(tagsList);
	};

	useEffect(fetchTags, []);

	return (
		<Flex align='center'>
			{tags.length > 0 && <Clear />}
			<HStack
				w='100%'
				m='6px 0 6px 25px'
				pb='3'
				pt='5'
				spacing={4}
				overflowY='auto'
				overflowX='scroll'
			>
				{tags.length > 0 ? (
					tagsList.map((tag, i) => <TagHub tag={tag} key={i} />)
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
