import { useState, useEffect } from 'react';
import Image from 'next/image';
//UI
import { motion, Variants } from 'framer-motion';

type TProps = { open: boolean };

const boxVariants: Variants = {
	idle: {
		rotate: 0,
		translateX: 0,
	},
	shaking: {
		translateX: [-10, 10, -5, 5, -1, 1, 0],
	},
};

export const MagicBox = ({ open }: TProps) => {
	const [shaking, setShake] = useState<boolean>(false);
	const [openBox, setOpen] = useState<boolean>(false);

	const handleShaking = (customTime: number = 800) => {
		setShake(true);
		setTimeout(() => setShake(false), customTime);
	};

	useEffect(() => {
		if (open) {
			handleShaking(1600);
			setTimeout(() => setOpen(true), 2200);
		}
	}, [open]);

	return (
		<motion.div
			variants={boxVariants}
			animate={shaking ? 'shaking' : 'idle'}
			transition={{
				duration: 0.7,
				repeat: shaking && open ? Infinity : undefined,
			}}
			initial='idle'
			style={{ cursor: 'pointer' }}
		>
			{openBox ? (
				<Image
					src={'/assets/boxOpen.png'}
					alt='Descentralized open box'
					width='250px'
					height='250px'
				/>
			) : (
				<Image
					onClick={() => handleShaking()}
					src={'/assets/box.png'}
					blurDataURL={'/assets/box.png'}
					alt='Descentralized box'
					width='250px'
					height='250px'
					placeholder='blur'
				/>
			)}
		</motion.div>
	);
};
