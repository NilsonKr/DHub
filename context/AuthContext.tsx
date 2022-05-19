import React, { useCallback } from 'react'
import { useContract } from '@hooks/web3/useContract'
import { useWallet } from '@hooks/web3/useWallet'

import { loginReturn } from '@roottypes/auth'

export type Context = {
  login: () => Promise<loginReturn>
}

export const authContext = React.createContext<Context | null>(null)

export const AuthContext: React.FC = ({ children }) => {
  const DhubContract = useContract()
  const { active, account } = useWallet()

  const login = useCallback(async (): Promise<loginReturn> => {
    try {
      const payload = await DhubContract.methods.login().call({ from: account })
      console.log(payload)
      return { error: null, payload: payload }
    } catch (err) {
      return { error: 'User not found', payload: null }
    }
  }, [account, DhubContract])

  return (
    <authContext.Provider value={{ login }} >{children}</authContext.Provider>
  )
}
