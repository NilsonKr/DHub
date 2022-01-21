import React from 'react';
//UI
import { Circle, InputGroup, InputRightElement, Input } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

type TProps = {
	handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	clear: () => void;
};

export const SearchInput = ({ handleChange = () => {}, value, clear }: TProps) => {
	return (
		<InputGroup w='auto' borderBottom='1px solid white'>
			<Input
				onChange={handleChange}
				value={value}
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
				{value !== '' && (
					<Circle size='15px' bg='white' onClick={clear}>
						<SmallCloseIcon h='15px' w='15px' color='black' />
					</Circle>
				)}
			</InputRightElement>
		</InputGroup>
	);
};
