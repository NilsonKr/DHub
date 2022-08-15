import React, { useState } from 'react';
import { useContract } from '@hooks/web3/useContract'
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
  ButtonGroup,
  Text,
  Spinner,
  Icon,
  Highlight,
  Skeleton,
} from '@chakra-ui/react';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { MdCopyAll } from 'react-icons/md'
import { GenericBtn } from '../Buttons/index';
//Types
import { Item } from '@roottypes/gallery'

type TProps = {
  item: Item;
  url: string;
  account: string;
  updateShareState: () => Promise<void>
  close: () => void;
};

export const ShareItem = ({ item, url, account, updateShareState, close }: TProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showIcon, setIcon] = useState<boolean>(false)

  const handleShare = async () => {
    setIsLoading(true)
    await updateShareState()
    setIsLoading(false)
  }

  return (
    <Modal isOpen={true} onClose={close}>
      <ModalOverlay />
      <ModalContent bg='gray.800'>
        <ModalCloseButton />
        <ModalHeader>Share state</ModalHeader>
        <ModalBody>
          {!isLoading && (item.shareable ?
            <>
              <Text color='green.400'>
                You are sharing this item to everyone who has this link!
              </Text>
              <Text fontSize='sm' color='gray.400' my='2'>
                <Highlight query='copy icon' styles={{ color: 'white', fontWeight: 'bold' }}>
                  Toggle the copy icon if you dont want to share it
                </Highlight>
              </Text>
            </>
            :
            <>
              <Text fontSize='sm' color='gray.500'>
                <Highlight query={['sharing this', 'world']} styles={{ color: 'pink.300', fontWeight: 'bold' }} >
                  You are not currently sharing this item to the world
                </Highlight>
              </Text>
              <Text color='gray.400' my='2'>
                <Highlight query='lock icon' styles={{ color: 'white', fontWeight: 'bold' }}>
                  Toggle the lock icon if you want to share it
                </Highlight>
              </Text>
            </>
          )}
          {isLoading && <>
            <Skeleton w='85%' h='21px' />
            <Skeleton w='70%' h='24px' my='2' />
          </>}
          <InputGroup my='3'>
            <Input
              variant='flushed'
              placeholder='Receiver Address'
              _placeholder={{ color: 'gray.400' }}
              value={url.split('//')[1]}
              disabled={true}
              _disabled={{
                color: item.shareable ? 'purple.200' : 'gray.500'
              }}
              color='gray.600'
              fontSize='0.9rem'
              p='5px 20px 5px 0'
            />
            <InputRightAddon
              role='group'
              bg={item.shareable ? 'purple.500' : 'purple.900'}
              _hover={{ bg: 'purple.700' }}
              cursor='pointer'
              _active={{ bg: 'purple.300' }}
              onClick={handleShare}
              onMouseEnter={() => setIcon(true)}
              onMouseLeave={() => setIcon(false)}
              children={item.shareable ?
                <Icon _groupActive={{ transform: 'scale(0.9)' }} transition='transform 50ms linear' color={showIcon ? 'gray.400' : 'white'} h='28px' w='28px' as={showIcon ? AiFillLock : MdCopyAll} />
                :
                <Icon _groupActive={{ transform: 'scale(0.9)' }} transition='transform 50ms linear' color={showIcon ? 'white' : 'gray.500'} h='28px' w='28px' as={showIcon ? AiFillUnlock : AiFillLock} />
              }
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing={4}>
            <GenericBtn w='100px' handleClick={close} disabled={isLoading} colorSchema='purple'>
              {isLoading ? <Spinner /> : 'Close'}
            </GenericBtn>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
