import { TiArrowRightThick } from 'react-icons/ti';
import { Circle, Icon } from '@chakra-ui/react';

type TProps = { bg?: string; color?: string; size: number | string; iconSize?: string };

export const RoundedRightArrow = ({
	bg = 'black',
	color = 'white',
	iconSize,
	size,
}: TProps) => {
	return (
		<Circle w={size} h={size} bg={bg}>
			<Icon
				cursor='pointer'
				w={iconSize}
				h={iconSize}
				color={color}
				as={TiArrowRightThick}
			/>
		</Circle>
	);
};
