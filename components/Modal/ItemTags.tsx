import React, { useState, useContext } from 'react';
import { tagsContext } from '@context/TagsContext'
import { useWallet } from '@hooks/web3/useWallet';
import { useTags } from '@hooks/useTags';
//UI
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Badge,
  Button,
  ButtonGroup,
  Spinner,
  Divider,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { GenericBtn } from '../Buttons/index';
import { ItemTagsRow } from '@components/Miscellaneous/'
import { TagsCarousel } from '@components/Gallery/TagsCarousel'
//DB
import { AddTagsToItem } from '@db/itemTags/'

type ComponentProps = { tagsFrom: number, close: (newModal?: string) => void }

export const ItemTags: React.FC<ComponentProps> = ({ tagsFrom, close }) => {
  const showToast = useToast()
  const { account } = useWallet()
  const { tags, isLoading: isLoadingTags, docTags } = useContext(tagsContext)
  const { selected, resetSelected, toggleSelect } = useTags(tags)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const addTag = async () => {
    setIsLoading(true)
    const tagsIndex = selected.map(tag => tags.findIndex((val) => val === tag))

    try {
      await AddTagsToItem(account, tagsIndex, tagsFrom, docTags)
      showToast({
        title: `There're new tags in your item!`,
        description: `Added succesfully`,
        status: 'success',
        duration: 2000,
        position: 'top',
      })
    } catch (error) {
      showToast({
        title: `There was an unexpected error`,
        description: 'Please, try again',
        status: 'error',
        duration: 3000,
        position: 'top',
      })
    }
    setIsLoading(false)
  }

  const linkTag = () => {
    const tagsToLink = [availableTags.find((tag) => !selected.includes(tag))]

    if (typeof tagsToLink[0] === 'string') {
      toggleSelect(tagsToLink[0])
    }
  }

  const availableTags = tags.filter((_, index) => !docTags[tagsFrom].includes(index))

  return <Modal isOpen onClose={close}>
    <ModalOverlay />
    <ModalContent bg='gray.800'>
      <ModalCloseButton />
      {tagsFrom !== null && <>
        <ModalBody my='5'>
          <ItemTagsRow account={account} index={tagsFrom} linkTag={linkTag} />
        </ModalBody>
        <Divider orientation='horizontal' w='90%' margin='0 auto' borderWidth='1px' />
      </>}
      <ModalHeader pb='0' >Add a new Tag</ModalHeader>
      <ModalBody>
        {!!availableTags.length ? <TagsCarousel
          account={account}
          tags={availableTags}
          isLoading={isLoadingTags}
          selectedTags={selected}
          toggleSelect={toggleSelect}
          resetSelected={resetSelected}
          newTag={() => close('new_tag')}
          blockDelete={true}
          deleteTag={(tag, index, cb) => { }}
        />
          :
          <Flex align='center' gap='1'>
            <Text>There's no more tags available</Text>
            <Badge onClick={() => close('new_tag')} fontSize='md' cursor='pointer' colorScheme='purple' textTransform='none'>
              Create a new one
            </Badge>
          </Flex>}
      </ModalBody>
      <ModalFooter>
        <ButtonGroup spacing={4}>
          <Button onClick={() => close()} variant='outline' colorScheme='white' disabled={false}>
            Close
          </Button>
          <GenericBtn w='100px' handleClick={addTag} disabled={!selected.length || isLoading} colorSchema='purple'>
            {isLoading ? <Spinner size='md' color='white' /> : 'Add tags'}
          </GenericBtn>
        </ButtonGroup>
      </ModalFooter>
    </ModalContent>
  </Modal>
}
