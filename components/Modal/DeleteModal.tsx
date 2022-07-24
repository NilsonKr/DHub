import React, { useState } from 'react';
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
  Heading,
  Spinner
} from '@chakra-ui/react';
import { GenericBtn } from '../Buttons/index';

type TProps = { content: React.ReactElement, close: () => void, onClick: () => Promise<void> | void };

export const DeleteModal = ({ content, close, onClick }: TProps) => {
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleDelete = async () => {
    setLoading(true)
    await onClick()
    setLoading(false)
  }

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
          {content}
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing={4}>
            <Button onClick={close} variant='outline' colorScheme='white'>
              Cancel
            </Button>
            <GenericBtn w='100px' handleClick={handleDelete} colorSchema='red' disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Delete'}
            </GenericBtn>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
