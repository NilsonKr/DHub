import React from 'react';
//UI
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ButtonGroup,
  Text,
  Heading,
  Highlight
} from '@chakra-ui/react';
import { GenericBtn } from '../Buttons/index';

type TProps = { close: () => void };

export const DeleteModal = ({ close }: TProps) => {
  return (
    <Modal isOpen onClose={close}>
      <ModalOverlay />
      <ModalContent bg='gray.800'>
        <ModalCloseButton />
        <ModalHeader>
          <Heading fontSize='3xl'>
            Are you sure ?
          </Heading>
        </ModalHeader>
        <ModalBody my='5'>
          <Text color='gray.200' fontSize='lg' fontWeight='semibold'>
            <Highlight query='MyNft.jpg' styles={{ bg: 'transparent', color: 'red.500' }}>
              You're about to delete this item ( MyNft.jpg ) from your gallery.
            </Highlight>
          </Text>
          <Text color='pink.300' fontSize='lg' fontWeight='semibold' mt={5}>Be sure that you won't regreet for this</Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing={4}>
            <Button onClick={close} variant='outline' colorScheme='white'>
              Cancel
            </Button>
            <GenericBtn w='100px' handleClick={() => { }} colorSchema='red'>
              Delete
            </GenericBtn>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
