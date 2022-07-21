import React from 'react';
//UI
import { HStack, Text, Flex, } from '@chakra-ui/react';
import { NewTag, Clear } from '../Buttons';
import { TagHub } from '../Miscellaneous/Tag';
import { SkeletonTag } from '../Miscellaneous/SkeletonTag';

const mockTags = [
	'Background',
	'Images',
	'Photos',
	'Landscape',
	'Work',
	'study',
	'hobbies',
];

type ComponentProps = {
	account: string,
	tags: string[]
	selectedTags: string[],
	isLoading: boolean,
	blockDelete?: boolean,
	newTag: () => void,
	toggleSelect: (tag: string) => void;
	resetSelected: () => void
	deleteTag: (tag: string, index?: number, cb?: () => void) => Promise<void> | void
};

export const TagsCarousel: React.FC<ComponentProps> = ({
	tags, selectedTags, blockDelete, isLoading, newTag, resetSelected, toggleSelect, deleteTag }
) => {

	return (
		<Flex align='center' w='100%'>
			{tags.length > 0 && (
				<Clear list={selectedTags} handleClear={resetSelected} />
			)}
			<HStack
				w='100%'
				m='6px 0 6px 25px'
				pb='3'
				pt='5'
				spacing='1'
				overflowY='auto'
				overflowX='scroll'
				css={{
					'&::-webkit-scrollbar': {
						height: '4px',
					},
					'&::-webkit-scrollbar-thumb': {
						background: '#757575b3',
						borderRadius: '20px',
						opacity: '0.5'
					},
				}}
			>
				{!isLoading && (tags.length > 0 ? (
					tags.map((tag, i) => (
						<TagHub tag={tag} key={i} blockDelete={blockDelete} selectedList={selectedTags} deleteTag={(tag, cb) => deleteTag(tag, i, cb)} select={toggleSelect} />
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
