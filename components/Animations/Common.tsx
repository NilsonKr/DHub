import React from 'react';
import { motion, Variants } from 'framer-motion';

const submitVariants: Variants = {
	initial: { x: 35, opacity: 0 },
	submit: {
		translateX: [0, -35, -35, -35, -35, -35],
		opacity: [0, 1, 1, 1, 1, 1],
		translateY: [0, 0, 0, 0, 0, -8, 0, -4, 0],
	},
};

type ComponentProps = {
	delay?: number;
	duration?: number
}

export const SubmitEntrance: React.FC<ComponentProps> = ({
	children,
	duration,
	delay,
}) => {
	return (
		<motion.div
			animate='submit'
			initial='initial'
			transition={{ delay, duration: duration ? duration : 1.5 }}
			variants={submitVariants}
		>
			{children}
		</motion.div>
	);
};

const bounceVariants: Variants = {
	bounce: {
		translateY: [0, -10, 0, -6, 1, -2, 1, 0],
	},
};


export const Bounce: React.FC<ComponentProps> = ({ children, duration, delay }) => {
	return <motion.div
		animate='bounce'
		transition={{ delay, duration: duration ? duration : 1.5 }}
		variants={bounceVariants}
	>
		{children}
	</motion.div>
}