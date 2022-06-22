import { Skeleton, VStack } from '@chakra-ui/react'

export const SkeletonCard = () => {
  return (
    <Skeleton h='260px' w='240px' borderRadius='md' startColor='gray.700' endColor='gray.800'  >
      <VStack gap='1' px='3' py='2' align='start'>
        <Skeleton w='100%' h='1.15rem' startColor='gray.500' endColor='gray.600' visibility='visible'></Skeleton>
        <Skeleton w='80%' h='1rem' startColor='gray.500' endColor='gray.600' visibility='visible'></Skeleton>
        {/*Visibility property is needed in order to override chakra's default */}
      </VStack>
    </Skeleton>
  )
}
