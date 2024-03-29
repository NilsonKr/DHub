import { useState, useRef } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
//UI
import { motion } from 'framer-motion';
import { RoundedRightArrow, CircleIcon } from '../Icons';
import { MdOutlineDownload, MdOutlineCopyAll, MdOutlineCheck } from 'react-icons/md';
import { BsFillTagsFill } from 'react-icons/bs';
import {
	Box,
	Text,
	Heading,
	Flex,
	VStack,
	Link,
	Circle,
	Icon,
	HStack,
} from '@chakra-ui/react';
//Types
import { Item } from '@roottypes/gallery'
//Utils
import { handleDownload } from '@utils/Item'
//Styles
import styles from './styles/card.module.css'

type Props = { index: number, item: Item, setSelected: () => void; openCreateTag: () => void }

export const Card = ({ index, item, setSelected, openCreateTag }: Props) => {
	const [isCopy, setCopy] = useState<boolean>(false);
	const downloadRef = useRef<HTMLAnchorElement>(null)

	const download = () => {
		handleDownload(downloadRef, item.url, item.title)
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(window.location.host + `/detail/${index}`);
		setCopy(true);
		setTimeout(() => setCopy(false), 1500);
	};

	return (
		<Box
			className={styles.hover_card}
			w='100%'
			h='100%'
			position='relative'
			shadow='0px 4px 8px rgba(255, 255, 255, 0.2)'
			borderRadius='5px'
			overflow='hidden'
			role='group'
		>
			<Box
				position='absolute'
				h='100%'
				w='100%'
				zIndex='2'
				bg='linear-gradient(180deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0) 40%)'
				_hover={{
					bg: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(246,246,246,0) 50%, rgba(0,0,0,0.7) 100%)',
				}}
			>
				<VStack px='3' py='2' h='100%' justifyContent='space-between'>
					<Box w='100%'>
						<Heading fontSize='md'>
							{item.title}
						</Heading>
						<Text color='gray.300' fontSize='sm' fontWeight='semibold' maxW='95%' textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap' >
							{item.description}
						</Text>
					</Box>
					<Flex
						opacity='0'
						align='end'
						width='100%'
						justifyContent='space-between'
						transition='opacity .2s linear'
						_groupHover={{ opacity: 1 }}
					>
						<Flex align='center' cursor='pointer' onClick={handleCopy}>
							<Link fontSize='sm' mr='1'>
								Copy link
							</Link>
							{isCopy ? (
								<motion.div
									animate={{ translateY: [-6, 0, -3, 0, 1] }}
									transition={{ duration: 0.6 }}
								>
									<Circle size='14px' bg='green.400'>
										<MdOutlineCheck color='white' size='12px' />
									</Circle>
								</motion.div>
							) : (
								<MdOutlineCopyAll size='14px' />
							)}
						</Flex>
						<HStack spacing='2'>
							<CircleIcon
								bg='pink.500'
								size='35px'
								iconSize='15px'
								IconAs={BsFillTagsFill}
								onClick={() => {
									setSelected()
									openCreateTag()
								}}
							/>
							<CircleIcon
								bg='pink.700'
								size='35px'
								iconSize='20px'
								IconAs={MdOutlineDownload}
								onClick={download}
							/>
							<NextLink href={`detail/${index}`} passHref={true}>
								<a>
									<RoundedRightArrow size='35px' bg='purple.600' iconSize='20px' />
								</a>
							</NextLink>
						</HStack>
					</Flex>
				</VStack>
			</Box>
			<Image
				layout='fill'
				objectFit='cover'
				src={item.url}
			/>
			<a ref={downloadRef} download='' href='' >
			</a>
		</Box>
	);
};
