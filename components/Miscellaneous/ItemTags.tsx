import React, { useContext } from 'react'
import { tagsContext } from '@context/TagsContext'

import { HStack, Text, useToast } from '@chakra-ui/react'
import { TagHub } from '@components/Miscellaneous'

type ComponentProps = { index: number }

export const ItemTags: React.FC<ComponentProps> = ({ index }) => {
  const { tags, docTags } = useContext(tagsContext)
  const showToast = useToast()

  const handleUnlinkTags = async () => {
  }

  return (
    <>
      <Text fontSize='lg' fontWeight='500'>Tags related to this item</Text>
      <HStack
        w='100%'
        pt='5'
        spacing='1'
        overflowY='auto'
        overflowX='scroll'
      >
        {index !== null && (docTags[index].length > 0 ? (
          docTags[index].map((tagIndex, i) => (
            <TagHub deleteTag={handleUnlinkTags} selectedList={[]} select={() => { }} tag={tags[tagIndex]} key={i} />
          ))
        ) : (
          <>
            <Text fontSize='lg' mr='2'>
              👋 You don't have any tags yet, Create your first one!
            </Text>
          </>
        ))}
      </HStack>
    </>
  )
}