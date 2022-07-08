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
  InputGroup,
  Input,
  InputRightAddon,
  Icon,
  Button,
  ButtonGroup,
  Spinner,
  Divider,
  useToast
} from '@chakra-ui/react';
import { AiOutlineTags } from 'react-icons/ai';
import { GenericBtn } from '../Buttons/index';
import { ItemTagsRow } from '@components/Miscellaneous/'
import { TagsCarousel } from '@components/Gallery/TagsCarousel'
//DB
import { AddTag, CreateTags } from '@db/tags'

type ComponentProps = { tagsFrom: number, open: boolean, close: (newModal?: string) => void }

export const ItemTags: React.FC<ComponentProps> = ({ open, tagsFrom, close }) => {
  if (tagsFrom === null)
    return null

  const { account } = useWallet()
  const { tags, isLoading: isLoadingTags, docTags } = useContext(tagsContext)
  const { selected, resetSelected, toggleSelect } = useTags(tags)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return <Modal isOpen={open} onClose={close}>
    <ModalOverlay />
    <ModalContent bg='gray.800'>
      <ModalCloseButton />
      {tagsFrom !== null && <>
        <ModalBody my='5'>
          <ItemTagsRow index={tagsFrom} />
        </ModalBody>
        <Divider orientation='horizontal' w='90%' margin='0 auto' borderWidth='1px' />
      </>}
      <ModalHeader pb='0' >Add a new Tag</ModalHeader>
      <ModalBody>
        <TagsCarousel
          account={account}
          tags={tags.filter((_, index) => !docTags[tagsFrom].includes(`${index}`))}
          isLoading={isLoadingTags}
          selectedTags={selected}
          toggleSelect={toggleSelect}
          resetSelected={resetSelected}
          newTag={() => close('new_tag')} />
      </ModalBody>
      <ModalFooter>
        <ButtonGroup spacing={4}>
          <Button onClick={() => close()} variant='outline' colorScheme='white' disabled={false}>
            Close
          </Button>
          <GenericBtn w='100px' handleClick={() => { }} disabled={!selected.length || isLoading} colorSchema='purple'>
            {isLoading ? <Spinner size='md' color='white' /> : 'Add tags'}
          </GenericBtn>
        </ButtonGroup>
      </ModalFooter>
    </ModalContent>
  </Modal>
}
