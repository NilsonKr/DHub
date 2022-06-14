import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { authContext } from '@context/AuthContext'
import { useWallet } from '@hooks/web3/useWallet'

type HookProps = (handleLogin: () => Promise<any>) => void

export const useInitAuth: HookProps = (handleLogin) => {
  const { active } = useWallet()
  const { isAuth } = useContext(authContext)
  const { push } = useRouter()

  useEffect(() => {
    if (active && !isAuth) {
      const autoLogin = async () => {
        await handleLogin()
      }

      if (localStorage.getItem('isConnected') === 'true') {
        autoLogin()
      } else {
        push('/')
      }
    }

    if (!active) {
      push('/')
    }
  }, [active])
}