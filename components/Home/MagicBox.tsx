import { useState, useEffect, useContext } from 'react';
import { authContext } from '@context/AuthContext'
import Image from 'next/image';
//UI
import { Box } from '@chakra-ui/react'
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
	const { isAuth } = useContext(authContext)
	const [shaking, setShake] = useState<boolean>(false);
	const [openBox, setOpen] = useState<boolean>(isAuth);

	const handleShaking = (customTime: number = 800) => {
		setShake(true);
		setTimeout(() => setShake(false), customTime);
	};

	useEffect(() => {
		if (open && !isAuth) {
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
			<Box w={['200px', '250px']} h={['200px', '250px']}>
				{openBox ? (
					<Image
						src={'/assets/boxOpen.png'}
						alt='Descentralized open box'
						width='100%'
						height='100%'
						layout='responsive'
					/>
				) : (
					<Image
						onClick={() => handleShaking()}
						src={'/assets/box.png'}
						blurDataURL={'/assets/box.png'}
						alt='Descentralized box'
						layout='responsive'
						width='100%'
						height='100%'
						placeholder='blur'
					/>
				)}
			</Box>
		</motion.div>
	);
};
