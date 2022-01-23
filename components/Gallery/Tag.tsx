import { useState } from 'react';
//UI
import { Button, Icon, Text, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { BsFillTagsFill } from 'react-icons/bs';

export const TagHub = ({ tag }: { tag: string }) => {
	const [selecteTag, switchSelect] = useState<boolean>(false);

	const handleClick = () => {
		switchSelect(prev => !prev);
	};
	return (
		<Tag
			onClick={handleClick}
			_hover={{ bg: 'pink.800' }}
			cursor='pointer'
			transform={selecteTag ? 'translateY(-8px)' : 'translateY(0px)'}
			transition='transform .1s linear'
			bg={selecteTag ? 'pink.300' : '#FF0099'}
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
