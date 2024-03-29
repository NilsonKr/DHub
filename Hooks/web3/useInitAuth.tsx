import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { authContext } from '@context/AuthContext'
import { useWallet } from '@hooks/web3/useWallet'

type HookProps = (handleLogin: () => Promise<any> | void, isExternal?: boolean) => void

export const useInitAuth: HookProps = (handleLogin, isExternal = false) => {
  const { active, connect } = useWallet()
  const { isAuth } = useContext(authContext)
  const { push } = useRouter()

  const autoLogin = async () => {
    const result = await handleLogin()

    if (result?.error)
      push('/')
  }

  const handleConnect = async () => {
    await connect()
  }

  useEffect(() => {
    if (!isExternal) {
      const storageFlag = localStorage.getItem('isConnected')

      if (active && !isAuth) {
        autoLogin()
      } else if (!active && storageFlag === 'true') {
        handleConnect()
      } else if (!active && storageFlag === 'false') {
        push('/')
      }
    }
  }, [active])
}