import React, { useContext } from 'react'
import { tagsContext } from '@context/TagsContext'

import { TagsCarousel } from './TagsCarousel'

type ComponentProps = { account: string, openNewTag: () => void }

export const GalleryTags: React.FC<ComponentProps> = ({ account, openNewTag }) => {
  const { tags, selected, isLoading, resetSelected, toggleSelect } = useContext(tagsContext)

  return (
    <TagsCarousel
      account={account}
      tags={tags}
      selectedTags={selected}
      isLoading={isLoading}
      resetSelected={resetSelected}
      toggleSelect={toggleSelect}
      newTag={openNewTag}
    />
  )
}
