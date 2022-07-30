import { useState, useEffect } from 'react'
import { useContract } from '@hooks/web3/useContract'
import { useRouter } from 'next/router'

import { useToast } from '@chakra-ui/react'

import { Item } from '@roottypes/gallery'

export const useItemDetail = (position: string, account: string) => {
  const { push } = useRouter()
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


  const deleteItem = async () => {
    setLoading(true)
    try {
      await DhubContract.methods.removeFile(position).send({ from: account })

      showToast({
        title: `Item deleted succesfully`,
        description: 'You will be redirected to your gallery!',
        status: 'success',
        duration: 3000,
        position: 'top',
      })

      setTimeout(() => push('/gallery'), 2000)
    } catch (error) {
      showToast({
        title: `There was an unexpected error trying to delete this item`,
        description: 'Please, try again',
        status: 'error',
        duration: 6000,
        position: 'top',
      })
      setLoading(false)
    }
  }

  const transferItem = async (target: string) => {
    setLoading(true)
    try {
      await DhubContract.methods.transferFile(account, target, position).send({ from: account })

      showToast({
        title: `Item transfered to ${target}`,
        description: 'Transaction executed succesfully',
        status: 'success',
        variant: 'top-accent',
        duration: 3000,
        position: 'top',
      })

      setTimeout(() => push('/gallery'), 1000)
    } catch (error) {
      showToast({
        title: `There was an unexpected error trying to transfer this item`,
        description: 'Please, check the receiver and try again ',
        status: 'error',
        duration: 6000,
        position: 'top',
      })
      setLoading(false)
    }
  }

  return { item, isLoading, deleteItem, transferItem }
}