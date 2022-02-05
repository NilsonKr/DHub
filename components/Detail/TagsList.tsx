import { useState, useEffect } from 'react';
//UI
import { HStack, Text, Flex } from '@chakra-ui/react';
import { NewTag } from '../Buttons';
import { TagHub } from '../Miscellaneous/Tag';
import { MdOutlineAdd } from 'react-icons/md';
import { RoundedBtn } from '../Index';

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

export const TagsList = ({ newTag }: TProps) => {
	const [tags, setTags] = useState<Ttag[]>([]);

	const fetchTags = () => {
		setTags(tagsList);
	};

	useEffect(fetchTags, []);

	return (
		<Flex align='center' w='100%'>
			<HStack
				w='100%'
				my='6px'
				pb='3'
				pt='5'
				spacing={1}
				overflowY='auto'
				overflowX='scroll'
			>
				{tags.length > 0 ? (
					tags.map((tag, i) => (
						<TagHub selectedList={[]} select={() => {}} tag={tag} key={i} />
					))
				) : (
					<>
						<Text fontSize='lg' mr='2'>
							👋 You don't have any tags yet, Create your first one!
						</Text>
						<NewTag isVariant={false} create={newTag} />
					</>
				)}
			</HStack>
			{tags.length > 0 && (
				<RoundedBtn onClick={newTag} bg='purple.500' size='30px' ml='15px'>
					<MdOutlineAdd size='25px' color='white' />
				</RoundedBtn>
			)}
		</Flex>
	);
};
