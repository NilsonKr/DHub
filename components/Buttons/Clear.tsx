import React from 'react';
//UI
import { Button } from '@chakra-ui/react';
import { GiBroom } from 'react-icons/gi';

export const Clear = () => {
	return (
		<Button
			bg='purple.600'
			p='2px 15px'
			h='32px'
			borderRadius='15px'
			leftIcon={<GiBroom size='20px' />}
		>
			Clear
		</Button>
	);
};
