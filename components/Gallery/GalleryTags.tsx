import React, { useContext } from 'react'
import { tagsContext } from '@context/TagsContext'

import { useToast } from '@chakra-ui/react'
import { TagsCarousel } from './TagsCarousel'

import { DeleteTag } from '@db/tags'

type ComponentProps = { account: string, openNewTag: () => void }

export const GalleryTags: React.FC<ComponentProps> = ({ account, openNewTag }) => {
  const { tags, selected, isLoading, resetSelected, toggleSelect } = useContext(tagsContext)

  const showToast = useToast()

  const deleteMethod = async (tag: string, index: number, cb?: () => void) => {
    try {
      await DeleteTag(account, tag)

      cb && cb()
      showToast({
        title: `Bye bye ${tag}!`,
        description: `Your old tag has been deleted`,
        status: 'success',
        duration: 2000,
        position: 'top',
      })
    } catch (error) {
      showToast({
        title: `There was an unexpected error`,
        description: 'Please, try again',
        status: 'error',
        duration: 2500,
        position: 'top',
      })
    }
  }

  return (
    <TagsCarousel
      account={account}
      tags={tags}
      selectedTags={selected}
      isLoading={isLoading}
      resetSelected={resetSelected}
      toggleSelect={toggleSelect}
      newTag={openNewTag}
      deleteTag={deleteMethod}
    />
  )
}
