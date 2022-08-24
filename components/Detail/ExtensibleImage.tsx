import React, { useState } from 'react'
import Image from 'next/image'
//UI
import { RiZoomInFill } from 'react-icons/ri'
import { Icon, Box, Square } from '@chakra-ui/react'

type ComponentProps = {
  url: string
}

export const ExtensibleImage: React.FC<ComponentProps> = ({ url }) => {
  const [isZoom, setZoom] = useState<boolean>(false)

  return (
    <>
      <Square
        onClick={e => setZoom(false)}
        position={isZoom ? 'absolute' : 'relative'}
        top='0'
        right='0'
        left='0'
        bottom='0'
        mr='12'
        zIndex='10'
        background='rgba(0,0,0,0.65)'
        cursor='pointer'
      >
        <Box
          onClick={e => e.stopPropagation()}
          position='relative'
          role='group'
          minW='280px'
          minH='280px'
          transform={isZoom ? 'translateX(-50%) scaleX(2) scaleY(1.8)' : 'scaleX(1)'}
          transformOrigin='left'
          transition={isZoom ? 'transform 0.1s ease-in' : 'unset'}
          cursor='initial'
          shadow={isZoom ? 'unset' : '0px 2px 10px rgba(255, 255, 255, 0.3)'}
        >
          <Image
            layout='fill'
            objectFit='cover'
            src={url}
          />
          {!isZoom && <Square
            position='absolute'
            minWidth='100%'
            minHeight='100%'
            opacity='0'
            transition='opacity 0.2s ease-in'
            cursor='pointer'
            background='linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0) 50%, rgba(5,5,5,0.70) 100%)'
            _groupHover={{ opacity: 1 }}
            onClick={() => setZoom(true)}
          >
            <Icon filter='drop-shadow(6px 6px 4px #000)' minH='80px' minW='80px' color='white' as={RiZoomInFill} />
          </Square>}
        </Box>
      </Square>

      <Box
        display={isZoom ? 'initial' : 'none'}
        position='relative'
        role='group'
        minW='280px'
        minH='280px'
        mr='12'
        shadow={'0px 2px 10px rgba(255, 255, 255, 0.3)'}
      >
        <Image
          layout='fill'
          objectFit='cover'
          src={url}
        />
      </Box>
    </>
  )
}
