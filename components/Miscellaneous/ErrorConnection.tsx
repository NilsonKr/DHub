import React from 'react';
//UI
import { Alert, AlertTitle, AlertIcon, AlertDescription, Text } from '@chakra-ui/react';
// import { CheckCircleIcon } from '@chakra-ui/icons';
//HOC
import { ConnectAnimation } from '@components/HOC'

type ComponentProps = {
  errorMsg: string
}

export const ErrorConnection = ConnectAnimation(({ errorMsg }: ComponentProps) => {
  return (
    <Alert
      status='warning'
      variant='top-accent'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='160px'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={2} fontSize='2xl' fontWeight='800'>
        There's a problem
      </AlertTitle>
      <AlertDescription gap='30px' pb='1'>
        <Text fontSize='1.1rem' fontWeight='600'>Please check your wallet!</Text>
        <Text>{errorMsg}</Text>
      </AlertDescription>
    </Alert>
  );
});
