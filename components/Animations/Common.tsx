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

export const SubmitEntrance: React.FC<{ delay?: number; duration?: number }> = ({
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
