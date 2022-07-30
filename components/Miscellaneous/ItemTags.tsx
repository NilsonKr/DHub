import React, { useContext } from 'react'
import { tagsContext } from '@context/TagsContext'
import { MdOutlineAdd } from 'react-icons/md'

import { HStack, Text, Flex, Spinner, useToast } from '@chakra-ui/react'
import { TagHub } from '@components/Miscellaneous'
import { RoundedBtn } from '@components/Index'

import { GenericBtn } from '@components/Buttons/GenericBtn'

import { DeleteTagsFrom } from '@db/itemTags'

type ComponentProps = { account: string, id: number, title?: boolean, background?: string, addIcon?: boolean, linkTag: () => void }

export const ItemTagsRow: React.FC<ComponentProps> = ({ account, id, title, background, addIcon, linkTag }) => {
  const { tags, docTags } = useContext(tagsContext)
  const showToast = useToast()

  const handleUnlinkTags = async (tag: string, tagIndex: number, cb: () => void) => {
    try {
      await DeleteTagsFrom(account, tagIndex, id, docTags)

      cb()
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

  const tagsList = docTags && docTags[id]

  return (

    <Flex w='100%' bg={background} borderRadius='2xl' padding='10px 10px 2px' >
      {title && <Text fontSize='lg' fontWeight='500'>Tags related to this item</Text>}
      <HStack
        w='90%'
        spacing='1'
        overflowY='hidden'
        overflowX='scroll'
        pb='1'
        css={{
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#757575b3',
            borderRadius: '20px',
            opacity: '0.5'
          },
        }}
      >
        {!tagsList && <Spinner color='pink.600' />}
        {id !== null && tagsList && ((tagsList.length > 0) ? (
          tagsList.map((tagIndex, i) => (
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
      {addIcon && tagsList && tagsList.length > 0 && (
        <RoundedBtn onClick={linkTag} mb='10px' bg='purple.500' size='27px' margin='0 0 0 auto' >
          <MdOutlineAdd size='22px' color='white' />
        </RoundedBtn>
      )}
    </Flex>
  )
}