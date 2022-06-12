import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { authContext } from '@context/AuthContext'

type HookProps = (handleLogin: () => Promise<any>) => void

export const useInitAuth: HookProps = (handleLogin) => {
  const { isAuth } = useContext(authContext)
  const { push } = useRouter()

  useEffect(() => {
    if (!isAuth) {
      const autoLogin = async () => {
        await handleLogin()
      }

      if (localStorage.getItem('isConnected') === 'true') {
        autoLogin()
      } else {
        push('/')
      }
    }
  }, [])
}