import React from 'react'
import { Form } from '@hooks/useForm'

import { VStack, Heading, Text } from '@chakra-ui/react'

type ComponentProps = {
  form: Form,
  handleChange: (field: string, value: string) => void
}

export const UpdatableFields: React.FC<ComponentProps> = ({ form, handleChange }) => {
  return (
    <VStack spacing={1} align='flex-start'>
      <Heading>{form.title}</Heading>
      <Text fontSize='lg' fontWeight='n' color='gray.400' >{form.description}</Text>
    </VStack>
  )
}
