import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
	global: (props: any) => ({
		body: {
			background: mode('gray50', 'black')(props),
		},
	}),
};

export const theme = extendTheme({
	config: {
		initialColorMode: 'dark',
	},
	styles,
});
