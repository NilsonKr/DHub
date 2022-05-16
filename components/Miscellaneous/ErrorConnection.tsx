import React from 'react';
//UI
import { Alert, AlertTitle, AlertIcon, AlertDescription } from '@chakra-ui/react';
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
      height='140px'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        There's a problem!
      </AlertTitle>
      <AlertDescription >
        {errorMsg}
      </AlertDescription>
    </Alert>
  );
});
