import { useState } from 'react';
//UI
import { motion, Variants } from 'framer-motion';
import { MagicBox } from './MagicBox';
import { BgBubble } from '../Miscellaneous/BgBubble';
import { VStack, Heading, Text, Button, Box } from '@chakra-ui/react';
import { Register } from '../Form/Register';
import { LoggedIn } from '../Miscellaneous/LoggedIn';

const variants: Variants = {
	open: {
		translateY: '100px',
		transition: { duration: 0.7 },
	},
};

export const HomeMain = () => {
	const [openBox, setOpenBox] = useState<boolean>(false);
	const [animate, setAnimation] = useState<boolean>(false);

	const handleAnimation = () => {
		setTimeout(() => setAnimation(true), 2000);
	};

	return (
		<Box my='10' position='relative'>
			<BgBubble />
			{/* {animate && <Register />} */}
			{animate && <LoggedIn />}
			<motion.div variants={variants} animate={animate ? 'open' : {}}>
				<VStack h='100vh' spacing={3} justify='center' align='center' textAlign='center'>
					<MagicBox open={openBox} />
					<Heading>Your own descentralized storage</Heading>
					<Text>Get start by sign in</Text>
					<Button
						_hover={{ bg: 'purple.400' }}
						_active={{ bg: 'purple.800', transform: 'scale(0.95)' }}
						bg='purple.600'
						px='30px'
						py='25px'
						borderRadius='25px'
						fontSize='2xl'
						onClick={() => {
							setOpenBox(true);
							handleAnimation();
						}}
					>
						Connect wallet
					</Button>
				</VStack>
			</motion.div>
		</Box>
	);
};
