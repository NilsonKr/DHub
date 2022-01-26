import React from 'react';
import { Button } from '@chakra-ui/react';

type TProps = {
	handleClick: () => void;
	hoverColor?: string;
	bg?: string;
	colorSchema?: string;
	activeColor?: string;
	variant?: string;
	borderColor?: string;
	[x: string]: any;
};

export const GenericBtn: React.FC<TProps> = ({
	handleClick,
	colorSchema,
	hoverColor,
	bg,
	activeColor,
	children,
	variant,
	borderColor,
	...props
}) => {
	return (
		<Button
			onClick={handleClick}
			variant={variant ? variant : 'solid'}
			borderColor={borderColor ? borderColor : 'current'}
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
