import React from 'react'
import Image from 'next/image'

import { Heading, VStack } from '@chakra-ui/react'
import { BgBubble } from '@components/Miscellaneous'

export const Forbidden = () => {
  return (
    <VStack align='center' justify='center' gap='20px' height='80vh'>
      <BgBubble />
      <Image
        width='160px'
        height='160px'
        src='/assets/stop.png'
        placeholder='blur'
        blurDataURL='/assets/stop.png'
      />
      <Heading fontSize='3xl'>
        Sorry, you can't access to this item
      </Heading>
    </VStack>
  )
}
