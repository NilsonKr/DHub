import React, { useState, useRef } from 'react'
import Image from 'next/image';
import { useForm, Form } from '@hooks/useForm'
//UI
import { Bounce as BounceAnimation } from '@components/Animations/Common'
import { QrCodeIcon } from '../../components/Icons';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { RoundedBtn, GenericBtn } from '../../components/Index';
import { ItemTagsRow } from '@components/Miscellaneous/';
import { BiLink, BiTrash } from 'react-icons/bi';
import { ImCloudDownload } from 'react-icons/im';
import { IoIosSend } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi'
import { TiCancel } from 'react-icons/ti'
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
import { ExtensibleImage } from './ExtensibleImage'
import { UpdatableFields } from './UpdatableFields'
//Utils
import { handleDownload, formatRawSize } from '@utils/Item'
//Types
import { Item } from '@roottypes/gallery'

type ComponentProps = {
  item: Item,
  isShared: string
  account: string
  handleEdit: (form: Form) => Promise<void>
  setModal: (modal: string) => void
}

export const DetailView: React.FC<ComponentProps> = ({ item, isShared, account, handleEdit, setModal }) => {
  const downloadRef = useRef<HTMLAnchorElement>(null)

  const { form, handleChange, resetForm } = useForm({ description: item.description, title: item.title })
  const [isCopied, setCopy] = useState<boolean>(false)
  const [isEdit, setEdit] = useState<boolean>(false)

  const formValid = ((form.description !== item.description || (form.title !== item.title)) && form.title !== '')

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

  const finishEdit = (cancel: boolean) => {
    setEdit(false)

    if (!cancel) {
      handleEdit(form)
    } else {
      resetForm()
    }
  }

  return (
    <>
      <VStack spacing={5} h='70vh' mt='50px' w='100%' justify='center' px='10' pb='10'>
        <Flex justify='start' w='100%' align='center'>
          <ExtensibleImage url={item.url} />
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
                <HStack spacing={5}>
                  {!isShared ?
                    <>
                      {isEdit ?
                        <GenericBtn disabled={!formValid} handleClick={() => finishEdit(false)} borderRadius='20px' bg='#ff009a'>
                          Done
                        </GenericBtn>
                        : <RoundedBtn bg='purple.500' size='40px' onClick={() => setEdit(true)}>
                          <FiEdit2 color='white' size='22px' />
                        </RoundedBtn>}
                      <RoundedBtn bg='red.500' size='40px' onClick={() => isEdit ? finishEdit(true) : setModal('delete_item')}>
                        {isEdit ? <TiCancel fill='white' size='30px' /> : <BiTrash color='white' size='25px' />}
                      </RoundedBtn>
                    </>
                    :
                    <RoundedBtn size='40px' bg='purple.500' onClick={download}>
                      <ImCloudDownload color='white' size='25px' />
                    </RoundedBtn>
                  }
                </HStack>
              </Flex>
              <Divider orientation='horizontal' w='100%' bg='white' />
            </Box>
            <UpdatableFields isEdit={isEdit} form={form} handleChange={handleChange} />
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
                  {formatRawSize(Number(item.size))}
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
            <a href={item.url} target='_blank' rel='noreferrer'>
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
