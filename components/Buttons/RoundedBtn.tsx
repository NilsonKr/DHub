import React from 'react';
import { Circle, SquareProps } from '@chakra-ui/react';

export const RoundedBtn: React.FC<SquareProps> = ({ children, ...props }) => {
	return (
		<Circle
			_active={{ transform: 'scale(0.8)' }}
			transition='transform .1s linear'
			cursor='pointer'
			{...props}
		>
			{children}
		</Circle>
	);
};
