import React from 'react';
//UI
import { motion, Variants } from 'framer-motion';
import { Box, useMediaQuery } from '@chakra-ui/react';

const getVariants = (isMobile: boolean): Variants => {
  return {
    hidden: {
      opacity: 0,
      translateY: '50px',
    },
    entrance: {
      opacity: 1,
      translateY: isMobile ? '-50px' : '0px',
      transition: {
        delay: 0.3,
        duration: 1,
      },
    },
  };
}

export const ConnectAnimation = (Component: React.FC<any>): React.FC<any> => {
  const Hoc = (props) => {
    const [isMobile] = useMediaQuery('(max-width: 768px)')

    return (
      <Box
        position='absolute'
        top='50px'
        left='50%'
        transform='translateX(-50%)'
        minW='65%'
        zIndex='1'
      >
        <motion.div variants={getVariants(isMobile)} animate='entrance' initial='hidden'>
          <Component {...props} />
        </motion.div>
      </Box>
    )
  }

  return Hoc
}
