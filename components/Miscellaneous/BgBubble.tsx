import React from 'react';
//UI
import { motion, MotionStyle } from 'framer-motion';
import { Box, BoxProps, Flex } from '@chakra-ui/react';

const opacityKeyFrames = [0, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.5, 0.5, 0.5, 0.1];

const initialStyles: any = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	x: '-50%',
	transform: 'translate(50%, -50%)',
};

export const BgBubble = (props: BoxProps) => {
	return (
		<>
			<motion.div
				animate={{
					scale: 15,
					opacity: opacityKeyFrames,
				}}
				initial={initialStyles}
				transition={{ duration: 8, repeat: Infinity, delay: 2, repeatDelay: 4 }}
				style={{ zIndex: '-1' }}
			>
				<Box
					width='50px'
					h='50px'
					borderRadius='50%'
					bgGradient='radial-gradient(50% 50% at 50% 50%, #6B11FF 0%, rgba(107, 17, 255, 0.1) 100%)'
					zIndex='-1'
				></Box>
			</motion.div>
			<motion.div
				animate={{
					scale: 15,
					opacity: opacityKeyFrames,
				}}
				initial={initialStyles}
				transition={{ duration: 8, repeat: Infinity, delay: 6, repeatDelay: 4 }}
				style={{ zIndex: '-1' }}
			>
				<Box
					width='50px'
					h='50px'
					borderRadius='50%'
					bgGradient='radial-gradient(50% 50% at 50% 50%, #6B11FF 0%, rgba(107, 17, 255, 0.1) 100%)'
					zIndex='-1'
				></Box>
			</motion.div>
		</>
	);
};
