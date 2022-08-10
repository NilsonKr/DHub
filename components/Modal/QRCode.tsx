import { useState } from 'react';
import QRCode from 'qrcode.react';
//UI
import { CheckCircleIcon } from '@chakra-ui/icons';
import { FaShareSquare } from 'react-icons/fa';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	Text,
	Flex,
	Square,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { SubmitEntrance } from '../Animations/Common';
import { GenericBtn } from '../Buttons/index';

type TProps = { iconUrl: string; url: string; open: boolean; close: () => void; };

export const QRCodeModal = ({ iconUrl, url, open, close }: TProps) => {
	const [isShare, setShare] = useState<boolean>(false);

	const shareImg = () => {
		navigator.clipboard.writeText(url);
		setShare(true);
		setTimeout(() => setShare(false), 2500);
	};

	return (
		<Modal isOpen={open} onClose={close}>
			<ModalOverlay />
			<ModalContent bg='gray.800'>
				<ModalCloseButton />
				<ModalBody my='5'>
					<Square size='100%' mt='50px'>
						<QRCode
							size={300}
							value={url}
							imageSettings={{ src: iconUrl, width: 50, height: 50 }}
						/>
					</Square>
					<GenericBtn
						display='flex'
						m='50px auto 0'
						hoverColor=''
						rightIcon={<FaShareSquare size='20px' color='white' />}
						bg='linear-gradient(90deg, rgba(255,0,153,1) 0%, rgba(107,70,193,1) 100%)'
						handleClick={shareImg}
						fontSize='lg'
						p='6'
						fontWeight='semibold'
						h='40px'
						borderRadius='50px'
					>
						Share on IPFS
					</GenericBtn>
					{isShare && (
						<Flex alignItems='center' justify='center' mt='35px'>
							<Text mr='10px' color='gray.100'>
								Copy to clipboard
							</Text>
							<SubmitEntrance delay={0.5}>
								<CheckCircleIcon color='green.300' w='20px' h='20px' />
							</SubmitEntrance>
						</Flex>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
