import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { authContext } from '@context/AuthContext'
import { useWallet } from '@hooks/web3/useWallet'

type HookProps = (handleLogin: () => Promise<any> | void) => void

export const useInitAuth: HookProps = (handleLogin) => {
  const { active, connect } = useWallet()
  const { isAuth } = useContext(authContext)
  const { push } = useRouter()

  const autoLogin = async () => {
    await handleLogin()
  }

  const handleConnect = async () => {
    await connect()
  }

  useEffect(() => {
    if (active && !isAuth) {

      if (localStorage.getItem('isConnected') === 'true') {
        autoLogin()
      } else {
        push('/')
      }

    } else if (!active) {
      handleConnect()
    }

  }, [active])
}