import React, { useState, useEffect } from 'react'
import { useWallet } from '@hooks/web3/useWallet'
import { useTags } from '@hooks/useTags'
//Types
import { TagsRecord } from '@roottypes/gallery'
//Db
import { GetTags } from '@db/tags'

export type Context = {
  tags: string[]
  selected: string[]
  isLoading: boolean
  toggleSelect: (tag: string) => void
  resetSelected: () => void
}

export const tagsContext = React.createContext<Context | null>(null)

export const TagsContext: React.FC = ({ children }) => {
  const { account } = useWallet()
  const { tags, selected, setTagsState, toggleSelect, resetSelected } = useTags()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchTags = () => {
    setIsLoading(true)
    GetTags(account, (snapshot) => {
      const record = snapshot.data() as TagsRecord

      if (record) {
        setTagsState(record.tags)
      }
      setIsLoading(false)
    })
  };

  useEffect(fetchTags, []);
  return (
    <tagsContext.Provider value={{ tags, selected, isLoading, toggleSelect, resetSelected }} >{children}</tagsContext.Provider>
  )
}
