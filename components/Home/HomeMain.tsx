import { useState } from 'react';
import Link from 'next/link';
import { useConfetti } from '../../Hooks/useConfetti';
//UI
import { motion, Variants } from 'framer-motion';
import { MagicBox } from './MagicBox';
import { BgBubble } from '../Miscellaneous/BgBubble';
import {
	VStack,
	HStack,
	Square,
	Heading,
	Text,
	Button,
	Box,
	SlideFade,
} from '@chakra-ui/react';
import { RoundedRightArrow } from '../Icons';
import { Register } from '../Form/Register';
import { LoggedIn } from '../Miscellaneous/LoggedIn';

const variants: Variants = {
	open: {
		translateY: '100px',
		transition: { duration: 0.7 },
	},
};

type TAnimateState = { state: string; trigger: boolean };

export const HomeMain = () => {
	const { realisticConfetti } = useConfetti(200);
	const [openBox, setOpenBox] = useState<boolean>(false);
	const [animate, setAnimation] = useState<TAnimateState>({
		state: 'stopped',
		trigger: false,
	});

	const handleAnimation = () => {
		setAnimation({ trigger: true, state: 'running' });
		setTimeout(() => setAnimation({ trigger: true, state: 'finish' }), 1500);
	};

	const triggerAnimation = () => {
		setTimeout(() => handleAnimation(), 2000);
	};

	return (
		<Box my='10' position='relative'>
			<BgBubble />
			{/* {animate && <Register />} */}
			{animate.trigger && <LoggedIn />}

			<motion.div variants={variants} animate={animate.trigger ? 'open' : {}}>
				<VStack
					minH={animate.trigger ? '120vh' : '100vh'}
					spacing={3}
					justify='center'
					align='center'
					textAlign='center'
				>
					<MagicBox open={openBox} />
					<Heading>Your own descentralized storage</Heading>
					{!animate.trigger && (
						<>
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
									triggerAnimation();
									setTimeout(realisticConfetti, 2500);
								}}
							>
								Connect wallet
							</Button>
						</>
					)}
					{animate.state === 'running' && <Box h='270px'></Box>}
					{animate.state === 'finish' && (
						<HStack
							style={{ marginTop: '10px !important' }}
							spacing={10}
							pt='20px'
							width='80%'
							justifyContent='center'
						>
							<SlideFade in={true} offsetX='-50px'>
								<Square
									h='250px'
									px='30px'
									flexFlow='column'
									bg='gray.900'
									borderRadius='10px'
									shadow='0px 4px 8px rgba(255, 255, 255, 0.3)'
								>
									<Heading mb='4' fontSize='3xl'>
										Go to Gallery
									</Heading>
									<Link href='/gallery'>
										<a>
											<RoundedRightArrow size='60px' iconSize='40px' />
										</a>
									</Link>
								</Square>
							</SlideFade>
							<SlideFade in={true} offsetX='-50px'>
								<Square
									h='250px'
									px='30px'
									flexFlow='column'
									bg='gray.900'
									borderRadius='10px'
									shadow='0px 4px 8px rgba(255, 255, 255, 0.3)'
								>
									<Heading mb='4' fontSize='3xl'>
										Go to Profile
									</Heading>
									<Link href='/profile'>
										<a>
											<RoundedRightArrow
												bg='white'
												color='black'
												size='60px'
												iconSize='40px'
											/>
										</a>
									</Link>
								</Square>
							</SlideFade>
						</HStack>
					)}
				</VStack>
			</motion.div>
		</Box>
	);
};
