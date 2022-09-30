import React from 'react'
import { Form } from '@hooks/useForm'
//UI
import { MdEdit } from 'react-icons/md'
import {
  VStack,
  Heading,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  FormControl,
} from '@chakra-ui/react'

type ComponentProps = {
  form: Form,
  isEdit: boolean
  handleChange: (field: string, value: string) => void
}

export const UpdatableFields: React.FC<ComponentProps> = ({ form, isEdit, handleChange }) => {
  return (
    <FormControl>
      <VStack spacing={2} align='flex-start'>
        {!isEdit ? <>
          <Heading>{form.title}</Heading>
          <Text fontSize='lg' fontWeight='n' color='gray.400' >{form.description}</Text>
        </> :
          <>
            <InputGroup w='100%' background='gray.900' borderColor='transparent' >
              <Input fontSize='1.4rem' fontWeight='bold' value={form.title} onChange={e => handleChange('title', e.target.value)} />
              <InputRightElement>
                <MdEdit size='22px' color='white' />
              </InputRightElement>
            </InputGroup>
            <InputGroup w='100%' background='gray.900' borderColor='transparent' >
              <Input color='gray.400' value={form.description} onChange={e => handleChange('description', e.target.value)} />
              <InputRightElement>
                <MdEdit size='22px' color='white' />
              </InputRightElement>
            </InputGroup>
          </>
        }
      </VStack>
    </FormControl>
  )
}
