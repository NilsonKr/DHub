import React, { useState, useEffect } from 'react';
//UI
import { Circle, InputGroup, InputRightElement, Input } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

type TProps = {
	handleSearch: (value: string) => void;
};

export const SearchInput = ({ handleSearch }: TProps) => {
	const [query, setQuery] = useState<string>('');

	useEffect(() => {
		handleSearch(query)
	}, [query])

	return (
		<InputGroup w='auto' borderBottom='1px solid white'>
			<Input
				onChange={(ev) => setQuery(ev.target.value)}
				value={query}
				pl='4'
				border='none'
				placeholder='Search...'
				_focus={{ borderColor: 'transparent' }}
				_placeholder={{ color: 'gray.300', pb: '0' }}
			/>
			<InputRightElement
				cursor='pointer'
				_active={{ transform: 'scale(.9)' }}
				transition='transform .1s linear'
			>
				{query !== '' && (
					<Circle size='15px' bg='white' onClick={() => setQuery('')}>
						<SmallCloseIcon h='15px' w='15px' color='black' />
					</Circle>
				)}
			</InputRightElement>
		</InputGroup>
	);
};
