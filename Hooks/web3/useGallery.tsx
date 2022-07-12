import { useEffect, useState, useContext, useMemo } from 'react'
import { useWallet } from './useWallet'
import { useContract } from './useContract'
import { authContext } from '@context/AuthContext'
import { useToast } from '@chakra-ui/react'
import { useSearch } from '@hooks/useSearch'
import { tagsContext } from '@context/TagsContext'
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
  const { tags, selected, docTags } = useContext(tagsContext)
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

  const filterByTag = (item: Item) => {
    const isSelected = selected.find(selectedTag => {
      const targetIdx = tags.findIndex(tag => tag === selectedTag)
      return docTags[item.id].includes(targetIdx)
    })

    return isSelected
  }

  const searchedItems = useMemo(() => items.filter(item => {
    if (!selected.length)
      return true

    if (!docTags[item.id])
      return false

    const isSelected = filterByTag(item)
    return isSelected
  }), [items, selected, docTags])

  return { files, searchedItems, isLoading, getUserFiles, handleSearch }
}