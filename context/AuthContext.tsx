import React, { useCallback, useState, useEffect } from 'react'
import { useContract } from '@hooks/web3/useContract'
import { useWallet } from '@hooks/web3/useWallet'

import { loginReturn, User } from '@roottypes/auth'

export type Context = {
  user: User
  isAuth: boolean
  account: string
  login: () => Promise<loginReturn>
  register: (name: string) => Promise<loginReturn>
  logout: () => void
}

export const authContext = React.createContext<Context | null>(null)

export const AuthContext: React.FC = ({ children }) => {
  const DhubContract = useContract()
  const { active, account, disconnect } = useWallet()
  const [user, setUser] = useState<User>(null)
  const [isAuth, setAuthState] = useState<boolean>(false)

  useEffect(() => {
    if (active) {
      setAuthState(false)
      login()
    }
  }, [account])

  const login = useCallback(async (): Promise<loginReturn> => {
    try {
      const payload = await DhubContract.methods.login().call({ from: account })
      setUser({ name: payload.name, profileUrl: payload.profileUrl })
      setAuthState(true)
      return { error: null, payload: payload }
    } catch (err) {
      return { error: 'User not found', payload: null }
    }
  }, [account, DhubContract])

  const register = useCallback(async (name: string): Promise<loginReturn> => {
    try {
      await DhubContract.methods.register(name, '').send({ from: account })
      return { error: null, payload: null }
    } catch (error) {
      return { error: 'Something went wrong , please try again', payload: null }
    }
  }, [account, DhubContract])

  const logout = () => {
    disconnect()
    setUser(null)
    setAuthState(false)
  }

  return (
    <authContext.Provider value={{ user, isAuth, account, login, register, logout }} >{children}</authContext.Provider>
  )
}
