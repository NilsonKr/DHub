import React, { useContext, useEffect } from 'react'
import { authContext } from '@context/AuthContext'
import { useWallet } from '@hooks/web3/useWallet'
import { useInitAuth } from '@hooks/web3/useInitAuth'

const InstantAuth = (Component: React.FC<any>): React.FC<any> => {
  return () => {
    const { login } = useContext(authContext)
    const { connect, active } = useWallet()

    useInitAuth(async () => {
      await connect()
    })

    useEffect(() => {
      if (active) login()
    }, [active])


    return <Component />
  }
}

export default InstantAuth 