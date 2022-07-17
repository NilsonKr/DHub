import { useState, useEffect } from 'react'
import { useContract } from '@hooks/web3/useContract'

import { useToast } from '@chakra-ui/react'

import { Item } from '@roottypes/gallery'

export const useItemDetail = (position: string, account: string) => {
  const showToast = useToast()
  const DhubContract = useContract()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [item, setItem] = useState<Item>(null)

  useEffect(() => {
    getItem()
  }, [])

  const getItem = async () => {
    setLoading(true)
    try {
      const result: Item = await DhubContract.methods.getFileByPosition(position).call({ from: account })

      setItem(result)
    } catch (error) {
      showToast({
        title: `There was an unexpected error accessing to this item`,
        description: 'Please, go back or refresh the page',
        status: 'error',
        duration: 10000,
        position: 'top',
      })
    }
    setLoading(false)
  }

  return { item, isLoading }
}