import { useState, useEffect, useContext, useCallback } from 'react';
import { authContext, Context } from '@context/AuthContext'
import Link from 'next/link';
import { useConfetti } from '@hooks/useConfetti';
import { useWallet } from '@hooks/web3/useWallet'
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
import { LoggedIn, ErrorConnection } from '../Miscellaneous';

const variants: Variants = {
	open: {
		translateY: '100px',
		transition: { duration: 0.7 },
	},
};

type TAnimateState = { state: string; trigger: boolean };

type RegisterState = { open: boolean, message: string }

export const HomeMain = () => {
	const { login } = useContext(authContext) as Context
	const { connect, active, isUnsupported } = useWallet()
	const { realisticConfetti } = useConfetti(200);
	const [openBox, setOpenBox] = useState<boolean>(false);
	const [isRegister, setRegister] = useState<RegisterState>({ open: false, message: '' })
	const [animate, setAnimation] = useState<TAnimateState>({
		state: 'stopped',
		trigger: false,
	});
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (error) {
			setTimeout(() => handleAnimation(error), animate.trigger ? 0 : 2000)
			setAnimation({ state: 'stopped', trigger: false })


		}
	}, [error])

	useEffect(() => {
		const isChainError = isUnsupported && !active ? 'Unsupported Network, Please change to other one as: "Rinkeby"' : null

		if (openBox && !isChainError) {
			handleLogin()
		} else {
			setError(isChainError)
		}
	}, [active, openBox])

	const handleAnimation = (error?: string | null, isRegister?: boolean) => {
		setAnimation({ trigger: true, state: 'running' });
		setTimeout(() => setAnimation({ trigger: true, state: 'finish' }), 1500);

		if (!error && !isRegister) {
			setError(null)
			setTimeout(realisticConfetti, 500);
		}
	};

	const handleConnect = async () => {
		await connect()
		setOpenBox(true);
	}

	const handleLogin = async () => {
		const result = await login()

		if (result.error) {
			setRegister({ message: result.error, open: true })
		}

		setTimeout(() => handleAnimation(null, true), 2000)
	}

	return (
		<Box my='10' position='relative'>
			<BgBubble />

			{animate.trigger && isRegister.open && <Register msg={isRegister.message} />}
			{animate.trigger && !error && !isRegister.open && <LoggedIn />}
			{animate.trigger && error && <ErrorConnection errorMsg={error} />}

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
								onClick={handleConnect}
							>
								Connect wallet
							</Button>
						</>
					)}
					{(animate.state === 'running' || error) && <Box h='270px'></Box>}
					{animate.state === 'finish' && !error && (
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
