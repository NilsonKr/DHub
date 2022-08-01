import React, { useContext } from 'react';
import { authContext, Context } from 'context/AuthContext';
//UI
import { Heading, Text, VStack, HStack, Highlight } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
//HOC
import { ConnectAnimation } from '@components/HOC'

export const LoggedIn = ConnectAnimation(() => {
	const { user } = useContext(authContext) as Context


	return (
		<VStack spacing={5}>
			<Heading>
				<Highlight query={user.name} styles={{ bg: 'transparent', color: 'purple.300' }}>
					{`Welcome back ${user.name} ! 🎉`}
				</Highlight>
			</Heading>
			<HStack spacing={4} align='center'>
				<CheckCircleIcon color='green.300' w='40px' h='40px' />
				<Text fontSize='lg'>Logged In</Text>
			</HStack>
		</VStack>
	);
});
