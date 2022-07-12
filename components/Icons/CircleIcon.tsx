import React from 'react'

import { IconType } from 'react-icons'
import { Circle, Icon, ComponentWithAs, IconProps, SquareProps } from '@chakra-ui/react'

interface ComponentProps extends SquareProps {
  size: string
  iconSize: string
  IconAs: IconType | ComponentWithAs<'svg', IconProps>
  onClick: () => void
}

export const CircleIcon: React.FC<ComponentProps> = ({
  bg, size, iconSize, IconAs, onClick
}) => {
  return (
    <Circle
      _active={{ transform: 'scale(0.8)' }}
      transition='transform .1s linear'
      bg={bg}
      size={size}
      cursor='pointer'
      onClick={onClick}
    >
      <Icon color='white' h={iconSize} w={iconSize} as={IconAs} />
    </Circle>
  )
}
