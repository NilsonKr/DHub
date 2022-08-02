import React, { useContext } from 'react'
import { authContext } from '@context/AuthContext'
import { useInitAuth } from '@hooks/web3/useInitAuth'

import { Box } from '@chakra-ui/react'

const InstantAuth = (Component: React.FC<any>): React.FC<any> => {
  return () => {
    const { login, isAuth } = useContext(authContext)

    useInitAuth(() => {
      login()
    })

    return isAuth ? <Component /> : <Box w='100%' h='80vh' />
  }
}

export default InstantAuth 