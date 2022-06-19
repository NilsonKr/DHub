import { useState } from 'react';
//UI
import { Heading, Button, Square, Skeleton } from '@chakra-ui/react';

type TProps = { handleFile: (file: File) => void; label?: string, loading?: boolean };

export const DragNDrop = ({ handleFile, label, loading }: TProps) => {
	const [isDrag, setDrag] = useState<boolean>(false);

	const handleDragEnter = (ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault();
		ev.stopPropagation();
		if (!isDrag) {
			setDrag(true);
		}
	};

	const handleDragExit = (ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault();
		ev.stopPropagation();
		if (isDrag) {
			setDrag(false);
		}
	};

	const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault();
		ev.stopPropagation();
		handleFile(ev.dataTransfer.files[0]);

		if (isDrag) {
			setDrag(false);
		}
	};

	return !loading ? (
		<Square
			onDragOver={handleDragEnter}
			onDragLeave={handleDragExit}
			onDropCapture={handleDrop}
			bg={isDrag ? '#8800ff45' : 'transparent'}
			w='100%'
			h='280px'
			py='50px'
			mt='40px'
			textAlign='center'
			border='2px dashed purple'
			borderColor='purple.500'
			borderRadius='10px'
			justifyContent='space-around'
			flexDirection='column'
		>
			<Heading fontSize='xl'>{label ? label : 'Drag & Drop your file here'}</Heading>
			<Heading>Or</Heading>
			<Button
				as={'label'}
				htmlFor='file'
				cursor='pointer'
				_hover={{ bg: 'purple.400' }}
				_active={{ bg: 'purple.600', border: 'none' }}
				bg='purple.500'
				boxShadow='rgb(148 0 255 / 40%) 0px 19px 38px, rgb(34 0 60 / 50%) 0px 15px 12px'
			>
				Browse file
				<input
					onChange={ev => handleFile(ev.target.files![0])}
					multiple={false}
					type='file'
					id='file'
					style={{ width: 0, height: 0, opacity: 0 }}
				/>
			</Button>
		</Square>
	) : <Skeleton h='280px' w='100%' mt='40px' startColor='purple.500' endColor='gray.600' />;
};
