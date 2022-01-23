import React from 'react';
import { Button } from '@chakra-ui/react';

type TProps = {
	handleClick: () => void;
	hoverColor?: string;
	bg?: string;
	colorSchema?: string;
	activeColor?: string;
	[x: string]: any;
};

export const GenericBtn: React.FC<TProps> = ({
	handleClick,
	colorSchema,
	hoverColor,
	bg,
	activeColor,
	children,
	...props
}) => {
	return (
		<Button
			onClick={handleClick}
			_hover={{ bg: colorSchema ? `${colorSchema}.400` : hoverColor }}
			_active={{
				transform: 'scale(.9)',
				bg: colorSchema ? `${colorSchema}.700` : activeColor,
			}}
			transition='transform .1s linear'
			bg={colorSchema ? `${colorSchema}.600` : bg}
			{...props}
		>
			{children}
		</Button>
	);
};
