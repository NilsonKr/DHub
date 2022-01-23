import React from 'react';
//UI
import { Button, Text, Icon } from '@chakra-ui/react';
import { ImUpload } from 'react-icons/im';

type TSizes = 'sm' | 'xl';
type TProps = { fireUpload: () => void; size: TSizes; [x: string]: any };

export const Upload: React.FC<TProps> = ({ fireUpload, size, ...props }) => {
	return (
		<Button
			onClick={fireUpload}
			_hover={{ bg: 'gray.700' }}
			_active={{ transform: 'scale(.9)' }}
			transition='transform .1s linear'
			bg='purple.600'
			borderRadius='10px'
			p={size === 'sm' ? '2px 15px' : '8px 20px'}
			h={size === 'sm' ? '32px' : '64px'}
			fontSize={size === 'sm' ? 'md' : '2xl'}
			leftIcon={
				<Icon
					color='white'
					h={size === 'sm' ? '18px' : '30px'}
					w={size === 'sm' ? '18px' : '30px'}
					as={ImUpload}
				/>
			}
			{...props}
		>
			Upload
		</Button>
	);
};
