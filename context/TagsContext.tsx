import React, { useState, useEffect } from 'react'
import { useWallet } from '@hooks/web3/useWallet'
import { useTags } from '@hooks/useTags'
//Types
import { TagsRecord, DocTags } from '@roottypes/gallery'
//Db
import { GetTags } from '@db/tags'

export type Context = {
  tags: string[]
  docTags: DocTags
  selected: string[]
  isLoading: boolean
  toggleSelect: (tag: string) => void
  resetSelected: () => void
}

type ComponentProps = {
  isItemShared: boolean
}

export const tagsContext = React.createContext<Context | null>(null)

export const TagsContext: React.FC<ComponentProps> = ({ children, isItemShared }) => {
  const { account } = useWallet()
  const { tags, selected, setTagsState, toggleSelect, resetSelected } = useTags()
  const [docTags, setDocsTags] = useState<DocTags>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchTags = () => {
    setIsLoading(true)
    GetTags(account, (snapshot) => {
      const record = snapshot.data() as TagsRecord

      if (record) {
        setTagsState(record.tags)
        setDocsTags(record.linkedDocs)
      }
      setIsLoading(false)
    })
  };

  useEffect(() => {
    if (!isItemShared)
      fetchTags()
  }, []);

  return (
    <tagsContext.Provider value={{ tags, docTags, selected, isLoading, toggleSelect, resetSelected }} >{children}</tagsContext.Provider>
  )
}
