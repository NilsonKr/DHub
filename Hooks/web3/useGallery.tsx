import { useEffect, useState, useContext } from 'react'
import { useWallet } from './useWallet'
import { useContract } from './useContract'
import { authContext } from '@context/AuthContext'

import { useToast } from '@chakra-ui/react'

type HookShape = () => { files: any[], isLoading: boolean }

export const useGallery: HookShape = () => {
  const { isAuth } = useContext(authContext)
  const { account } = useWallet()
  const DhubContract = useContract()
  const showToast = useToast()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [files, setFiles] = useState<any[]>()

  useEffect(() => {
    if (isAuth) {
      getUserFiles(account)
    }
  }, [isAuth])

  const getUserFiles = async (acc: string) => {
    try {
      const payload = await DhubContract.methods.getFilesByUser().call({ from: acc })
      console.log(payload, 'files')
    } catch (error) {
      console.log(error, 'error')
    }

    setLoading(false)
  }

  return { files, isLoading }
}