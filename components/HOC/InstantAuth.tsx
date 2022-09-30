import React, { useContext } from 'react'
import { authContext } from '@context/AuthContext'
import { useInitAuth } from '@hooks/web3/useInitAuth'

import { Box } from '@chakra-ui/react'

const InstantAuth = (Component: React.FC<any>): React.FC<any> => {
  const Hoc = () => {
    const { login, isAuth, isItemShared } = useContext(authContext)
    useInitAuth(login, true)

    if (isItemShared)
      return <Component />

    return isAuth ? <Component /> : <Box w='100%' h='80vh' />
  }

  return Hoc
}

export default InstantAuth 