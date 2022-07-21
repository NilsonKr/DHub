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
  Heading,
} from '@chakra-ui/react';
import { GenericBtn } from '../Buttons/index';

type TProps = { content: React.ReactElement, close: () => void };

export const DeleteModal = ({ content, close }: TProps) => {
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
            <GenericBtn w='100px' handleClick={() => { }} colorSchema='red'>
              Delete
            </GenericBtn>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
