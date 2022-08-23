import React, { useState, useRef } from 'react'
import Image from 'next/image';
import { useForm } from '@hooks/useForm'
//UI
import { Bounce as BounceAnimation } from '@components/Animations/Common'
import { QrCodeIcon } from '../../components/Icons';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { RoundedBtn, GenericBtn } from '../../components/Index';
import { ItemTagsRow } from '@components/Miscellaneous/';
import { BiLink, BiTrash } from 'react-icons/bi';
import { ImCloudDownload } from 'react-icons/im';
import { IoIosSend } from 'react-icons/io';
import {
  VStack,
  HStack,
  Flex,
  Box,
  Heading,
  Text,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { UpdatableFields } from './UpdatableFields'
//Utils
import { handleDownload } from '@utils/Item'
//Types
import { Item } from '@roottypes/gallery'

type ComponentProps = {
  item: Item,
  isShared: string
  account: string
  setModal: (modal: string) => void
}

export const DetailView: React.FC<ComponentProps> = ({ item, isShared, account, setModal }) => {
  const downloadRef = useRef<HTMLAnchorElement>(null)

  const { form, handleChange } = useForm({ description: item.description, title: item.title })
  const [isCopied, setCopy] = useState<boolean>(false)

  const copy = () => {
    if (!isShared) {
      setModal('share_item')
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopy(true)
    }
  }
  const download = () => {
    handleDownload(downloadRef, item.url, item.title)
  }

  return (
    <>
      <VStack spacing={5} h='70vh' mt='50px' w='100%' justify='center' px='10' pb='10'>
        <Flex justify='start' w='100%'>
          <Box
            w='280px'
            h='280px'
            position='relative'
            shadow='0px 2px 10px rgba(255, 255, 255, 0.3)'
            mr='12'
          >
            <Image
              layout='fill'
              objectFit='cover'
              src={item.url}
            />
          </Box>
          <VStack w='65%' align='start' spacing={5}>
            <Box w='100%'>
              <Flex justifyContent='space-between' align='center'>
                <HStack p='10px 5px' align='center' spacing={5}>
                  <Heading fontWeight='semibold' fontSize='2xl'>
                    Share
                  </Heading>
                  <RoundedBtn
                    bg='purple.500'
                    size='40px'
                    onClick={() => setModal('qrcode')}
                  >
                    <QrCodeIcon size='20px' color='white' />
                  </RoundedBtn>
                  <RoundedBtn bg='purple.500' size='40px' onClick={copy}>
                    <BiLink color='white' size='25px' />
                  </RoundedBtn>
                  {isCopied && <BounceAnimation duration={1} >
                    <CheckCircleIcon color='green.400' w='25px' h='25px' />
                  </BounceAnimation>}
                </HStack>
                {!isShared ?
                  <RoundedBtn bg='red.500' size='40px' onClick={() => setModal('delete_item')}>
                    <BiTrash color='white' size='25px' />
                  </RoundedBtn>
                  :
                  <RoundedBtn size='40px' bg='purple.500' onClick={download}>
                    <ImCloudDownload color='white' size='25px' />
                  </RoundedBtn>
                }
              </Flex>
              <Divider orientation='horizontal' w='100%' bg='white' />
            </Box>
            <UpdatableFields form={form} handleChange={handleChange} />
            <VStack spacing={4} align='start'>
              <Flex align='center'>
                <Text>Owner : </Text>
                <Badge ml='3' bg='gray.700' p='1' borderRadius='5px'>
                  {account ?? isShared}
                </Badge>
              </Flex>
              <Flex align='center'>
                <Text>Size : </Text>
                <Badge ml='3' bg='gray.700' p='1' borderRadius='5px'>
                  {(item.size)} KB
                </Badge>
              </Flex>
              <Flex align='center'>
                <Text>Upload Date : </Text>
                <Badge ml='3' bg='gray.700' p='1' borderRadius='5px'>
                  {new Date(item.uploadDate).toLocaleDateString()}
                </Badge>
              </Flex>
            </VStack>
          </VStack>
        </Flex>
        {!isShared && <ItemTagsRow account={account} id={Number(item.id)} background='gray.900' addIcon linkTag={() => setModal('add_tag')} />}
        <HStack justify='start' spacing={3} w='100%'>
          <a ref={downloadRef} download='' href='' >
          </a>
          {!isShared ? <>
            <RoundedBtn size='50px' bg='purple.500' onClick={download}>
              <ImCloudDownload color='white' size='30px' />
            </RoundedBtn>
            <GenericBtn
              hoverColor=''
              rightIcon={<IoIosSend size='30px' color='white' />}
              bg='linear-gradient(90deg, rgba(255, 0, 184, 0.62) 1.1%, #3E02C9 98.9%)'
              handleClick={() => setModal('transfer')}
              fontSize='2xl'
              fontWeight='semibold'
              h='50px'
              borderRadius='10px'
            >
              TRANSFER
            </GenericBtn>
          </>
            :
            <a href={item.url} target='_blank'>
              <GenericBtn
                hoverColor=''
                rightIcon={<IoIosSend size='30px' color='white' />}
                bg='linear-gradient(90deg, rgba(255, 0, 184, 0.62) 1.1%, #3E02C9 98.9%)'
                handleClick={() => { }}
                fontSize='2xl'
                fontWeight='semibold'
                h='50px'
                borderRadius='10px'
              >
                Watch it on IPFS
              </GenericBtn>
            </a>
          }
        </HStack>
      </VStack>

    </>
  )
}
