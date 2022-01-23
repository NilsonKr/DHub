import React from 'react';
//UI
import { Button, list } from '@chakra-ui/react';
import { GiBroom } from 'react-icons/gi';

export const Clear = ({
	handleClear,
	list,
}: {
	handleClear: () => void;
	list: Ttag[];
}) => {
	return (
		<Button
			onClick={handleClear}
			_hover={{ bg: 'purple.300' }}
			bg='purple.600'
			p='2px 15px'
			h='32px'
			borderRadius='15px'
			leftIcon={<GiBroom size='20px' />}
			disabled={!list.length}
		>
			Clear
		</Button>
	);
};
