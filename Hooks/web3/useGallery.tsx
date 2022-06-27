import { useEffect, useState, useContext } from 'react'
import { useWallet } from './useWallet'
import { useContract } from './useContract'
import { authContext } from '@context/AuthContext'
import { useToast } from '@chakra-ui/react'
import { useSearch } from '@hooks/useSearch'
//Types
import { Item } from '@roottypes/gallery'

type HookShape = () => {
  files: Item[],
  searchedItems: Item[],
  isLoading: boolean,
  getUserFiles: (acc: string) => Promise<void>
  handleSearch: (key: string, value: string) => void
}

export const useGallery: HookShape = () => {
  const { isAuth } = useContext(authContext)
  const { account } = useWallet()
  const DhubContract = useContract()
  const showToast = useToast()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [files, setFiles] = useState<Item[]>([])
  const { items, setItems, handleSearch } = useSearch<Item>([])

  useEffect(() => {
    if (isAuth) {
      getUserFiles(account)
    }
  }, [isAuth])

  const getUserFiles = async (acc: string) => {
    setLoading(true)
    try {
      const payload = await DhubContract.methods.getFilesByUser().call({ from: acc })
      setItems(payload)
      setFiles(payload)
    } catch (error) {
      showToast({
        title: `There was an unexpected error retrieving your item list, `,
        description: 'Please,refresh the page',
        status: 'error',
        duration: 5000,
        position: 'top',
      })
    }
    setLoading(false)
  }

  return { files, searchedItems: items, isLoading, getUserFiles, handleSearch }
}