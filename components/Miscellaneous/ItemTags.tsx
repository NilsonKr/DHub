import React, { useContext } from 'react'
import { tagsContext } from '@context/TagsContext'

import { HStack, Text, useToast } from '@chakra-ui/react'
import { TagHub } from '@components/Miscellaneous'

import { GenericBtn } from '@components/Buttons/GenericBtn'

import { DeleteTagsFrom } from '@db/itemTags'

type ComponentProps = { account: string, index: number, linkTag: () => void }

export const ItemTagsRow: React.FC<ComponentProps> = ({ account, index, linkTag }) => {
  const { tags, docTags } = useContext(tagsContext)
  const showToast = useToast()

  const handleUnlinkTags = async (tag: string, tagIndex: number, cb: () => void) => {
    try {
      await DeleteTagsFrom(account, tagIndex, index, docTags)
      showToast({
        title: `See you soon ${tag}!`,
        description: `This has been unliked from the item`,
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
    <>
      <Text fontSize='lg' fontWeight='500'>Tags related to this item</Text>
      <HStack
        w='100%'
        pt='5'
        px='1'
        spacing='1'
        overflowY='auto'
        overflowX='scroll'
      >
        {index !== null && (docTags[index].length > 0 ? (
          docTags[index].map((tagIndex, i) => (
            <TagHub deleteTag={(tag, cb) => handleUnlinkTags(tag, i, cb)} selectedList={[]} select={() => { }} tag={tags[tagIndex]} key={i} />
          ))
        ) : (
          <>
            <Text fontSize='md' mr='1' color='gray.400'>
              You have not added any tags to this item yet
            </Text>
            <GenericBtn handleClick={linkTag} bg='#FF0099' hoverColor='pink.400' p='0px 20px'> Add one </GenericBtn>
          </>
        ))}
      </HStack>
    </>
  )
}