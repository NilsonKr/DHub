import React from 'react';
//UI
import { Button, Circle, Icon } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { BsFillTagsFill } from 'react-icons/bs';

type TNewProps = { create: () => void; isVariant?: boolean };

export const NewTag = ({ create, isVariant }: TNewProps) => {
	return !isVariant ? (
		<Button
			onClick={create}
			_hover={{ bg: 'pink.300' }}
			_active={{ bg: 'pink.700' }}
			transition='transform .1s linear'
			bg='#FF0099'
			borderRadius='10px'
			minW='90px'
			p='0px 12px'
			h='32px'
			rightIcon={<AddIcon color='white' h='12px' w='12px' />}
		>
			Create
		</Button>
	) : (
		<Button
			onClick={create}
			_hover={{ bg: 'purple.300' }}
			_active={{ bg: 'purple.800' }}
			transition='transform .1s linear'
			bg='purple.600'
			borderRadius='10px'
			p='0px 12px'
			h='32px'
			rightIcon={<Icon color='white' h='18px' w='18px' as={BsFillTagsFill} />}
			leftIcon={
				<Circle bg='purple.700' size='25px'>
					<AddIcon color='white' h='12px' w='12px' />
				</Circle>
			}
		></Button>
	);
};
