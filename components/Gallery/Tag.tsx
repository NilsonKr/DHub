import { useState } from 'react';
//UI
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { BsFillTagsFill } from 'react-icons/bs';

type TProps = { select: (tag: Ttag) => void; tag: Ttag; selectedList: Ttag[] };

export const TagHub = ({ tag, select, selectedList }: TProps) => {
	return (
		<Tag
			onClick={() => select(tag)}
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
	);
};
