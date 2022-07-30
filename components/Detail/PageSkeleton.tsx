import React from 'react'

import {
  VStack,
  HStack,
  Flex,
  Box,
  Heading,
  Text,
  Badge,
  Divider,
  Skeleton,
  SkeletonCircle
} from '@chakra-ui/react';

export const PageSkeleton = () => {
  return (
    <VStack spacing={5} h='70vh' mt='50px' w='100%' justify='center' px='10' pb='10'>
      <Flex justify='start' w='100%'>
        <Skeleton
          startColor='pink.900'
          endColor='purple.900'
          w='280px'
          h='280px'
          position='relative'
          shadow='0px 2px 10px rgba(255, 255, 255, 0.3)'
          mr='12'
        />
        <VStack w='65%' align='start' spacing={5}>
          <Box w='100%'>
            <HStack p='10px 5px' align='center' spacing={5}>
              <Skeleton width='100px' h='40px' speed={1.2} />
              <SkeletonCircle
                borderRadius='50%'
                size='40px'
                speed={1.2}
              />
              <SkeletonCircle
                borderRadius='50%'
                size='40px'
                speed={1.2}
              />
            </HStack>
            <Divider orientation='horizontal' w='100%' bg='white' />
          </Box>
          <VStack spacing={2} align='flex-start' width='100%'>
            <Skeleton minWidth='250px' h='30px' />
            <Skeleton minWidth='80%' h='20px' />
          </VStack>
          <VStack spacing={6} align='start' w='100%'>
            <Skeleton speed={1.2} width='100%' h='20px' />
            <Skeleton speed={1.2} width='100%' h='20px' />
            <Skeleton speed={1.2} width='100%' h='20px' />
          </VStack>
        </VStack>
      </Flex>
      <Skeleton width='100%' h='26px' borderRadius='2xl' />
      <HStack justify='start' spacing={3} w='100%'>
        <SkeletonCircle
          borderRadius='50%'
          size='50px'
          speed={1.2}
        />
        <Skeleton
          startColor='pink.900'
          endColor='purple.900'
          borderRadius='15px'
          w='150px'
          h='50px'
          speed={1.2}
        />
      </HStack>
    </VStack>
  )
}