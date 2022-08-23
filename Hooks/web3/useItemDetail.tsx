import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useContract } from '@hooks/web3/useContract'
import { useToast } from '@chakra-ui/react'
import { tagsContext } from '@context/TagsContext'
//Types
import { Item } from '@roottypes/gallery'
//DB
import { ClearTagsFrom } from '@db/itemTags'

export const useItemDetail = (position: string, account: string, shareAcc: string) => {
  const router = useRouter()
  const showToast = useToast()
  const DhubContract = useContract()
  const { docTags } = useContext(tagsContext)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [item, setItem] = useState<Item>(null)
  const [isForbidden, setForbidden] = useState<boolean>(false)

  useEffect(() => {
    if (!shareAcc) {
      getItem()
    } else {
      setItem({
        id: router.query?.id as string,
        title: router.query?.title as string,
        description: router.query?.description as string,
        size: router.query?.size as string,
        uploadDate: router.query?.uploadDate as string,
        url: `https://${router.query?.url as string}`,
        shareable: true
      })
    }
  }, [])

  const getItem = async () => {
    setLoading(true)
    try {
      let result: Item

      if (shareAcc) {
        result = await DhubContract.methods.getFileByPosition(position, shareAcc).call({ from: account })
      } else {
        result = await DhubContract.methods.getFileByPosition(position).call({ from: account })
      }

      setItem(result)
    } catch (error) {
      if (shareAcc) {
        setForbidden(true)
      } else {
        showToast({
          title: `There was an unexpected error accessing to this item`,
          description: 'Please, go back or refresh the page',
          status: 'error',
          duration: 10000,
          position: 'top',
        })
      }
    }
    setLoading(false)
  }


  const deleteItem = async () => {
    setLoading(true)
    try {
      await ClearTagsFrom(account, item.id, docTags)
      await DhubContract.methods.removeFile(position).send({ from: account })

      showToast({
        title: `Item deleted succesfully`,
        description: 'You will be redirected to your gallery!',
        status: 'success',
        duration: 3000,
        position: 'top',
      })
      setTimeout(() => router.push('/gallery'), 2000)
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

  const updateShareState = (): Promise<void> => new Promise((resolve, reject) => {
    DhubContract.methods.updateShareState(position).send({ from: account })
      .on('transactionHash', () => {
        showToast({
          title: `This may take a couple of minutes`,
          description: 'While we update the state in the smart-contract',
          status: 'info',
          duration: 6000,
          position: 'top',
          variant: 'subtle'
        })
      })
      .on('receipt', () => {
        setItem(prev => ({ ...prev, shareable: !prev.shareable }))
        showToast({
          title: `Udapted share state succesfully`,
          status: 'success',
          duration: 3000,
          position: 'top',
          variant: 'subtle'
        })
        resolve()
      })
      .on("error", () => {
        showToast({
          title: `There was an unexpected error updating the 'shareable' state`,
          description: 'Please, go back or refresh the page',
          status: 'error',
          duration: 10000,
          position: 'top',
        })
        reject()
      })
  })

  const transferItem = async (target: string) => {
    setLoading(true)
    try {
      await ClearTagsFrom(account, item.id, docTags)
      await DhubContract.methods.transferFile(account, target, position).send({ from: account })

      showToast({
        title: `Item transfered to ${target}`,
        description: 'Transaction executed succesfully',
        status: 'success',
        variant: 'top-accent',
        duration: 3000,
        position: 'top',
      })

      setTimeout(() => router.push('/gallery'), 1000)
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

  return { item, isLoading, isForbidden, deleteItem, updateShareState, transferItem }
}